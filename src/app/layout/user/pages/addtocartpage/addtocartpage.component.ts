import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

// UI Components
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { ProductDisplayingBarComponent } from "../../ui/product-displaying-bar/product-displaying-bar.component";

// Services
import { ApiService } from '../../../../api.service';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { EmailService } from '../../../../services/email.service';

export interface OrderEmailContext {
  orderId: number;
  customerName: string;
  items: Array<{
    orderItemId: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}

@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [
    // Standalone components or pipes
    AddtoCartDeletebtnComponent,
    CurrencyPipe,
    LongButtonComponent,
    ProductDisplayingBarComponent
  ],
  templateUrl: './addtocartpage.component.html',
  styleUrls: ['./addtocartpage.component.scss']
})
export class AddtocartpageComponent {
  userId: number = 0;
  emailTemplate: string = '';

  // Optional IDs, data
  id: any;
  data: any;

  // Arrays / lists
  cartItemList: any[] = [];
  CartItems: any[] = [];
  productIds: number[] = [];

  // Address / shipping
  selectedAddress: any;
  address: string = '';

  totalPrice: number = 0;

  constructor(
    public api: ApiService,
    public apis: ApiServiceService,
    private route: ActivatedRoute,
    public global: GlobalService,
    private router: Router,
    public emailservice: EmailService
  ) {
    // Ensure userId is read from localStorage
    this.global.getUserId();
  }

  ngOnInit() {
    this.userId = this.global.userId();

    // Load address if previously selected
    if (this.global.selectedAddressId()) {
      this.selectedAddress = +this.global.selectedAddressId();
      this.loadAddress(this.selectedAddress);
    }

    // 1) Subscribe to getCartCount() so it fetches from the server
    this.global.getCartCount().subscribe({
      next: (cartItems: any[]) => {
        // 2) After data arrives, we store locally
        this.cartItemList = cartItems;
        this.productIds = cartItems.map(item => item.productId);

        console.log('Cart list:', cartItems);
        console.log('Product IDs:', this.productIds);

        // 3) Now fetch product details (color, size, etc.)
        this.fetchCartItems(cartItems);
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  loadAddress(addressId: number) {
    this.apis.getAddressById(addressId).subscribe({
      next: (formattedAddress) => {
        this.address = formattedAddress;
      },
      error: (error) => {
        console.error('Error fetching address:', error);
      }
    });
  }

  /**
   *  Use productIds to fetch full product details, then merge with cart info.
   */
  fetchCartItems(cartItems: any[]) {
    const requests = this.productIds.map((id) => this.apis.getProductsById(id));
    if (requests.length === 0) {
      // If cart is empty, just stop
      return;
    }

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        this.CartItems = responses.map((res, index) => {
          const cartItem = cartItems.find(item => item.productId === this.productIds[index]);
          return {
            id: this.productIds[index],
            ...res,
            colorId: cartItem?.colorId,
            sizeId: cartItem?.sizeId
          };
        });

        this.calculateTotalPrice();
        console.log('Updated Cart Items:', this.CartItems);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.CartItems.reduce((total, product) => {
      // See how many of this product the user wants
      const cartItem = this.cartItemList.find((item: any) => item.productId === product.id);
      const quantity = cartItem ? cartItem.quantity : 0;
      return total + (product.price * quantity);
    }, 0);

    // Example logic: address == 3 => add shipping
    if (this.selectedAddress == 3) {
      this.totalPrice += 50;
    }

    console.log('Total Price:', this.totalPrice);
  }

  setOrderFromCart() {
    // Copy the cart items into the global signal for the next step
    this.global.signalOrderList.set([...this.cartItemList]);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  placeOrder() {
    // Prepare data for the placeOrder API
    this.setOrderFromCart();
    this.apis.placeOrder(this.userId, this.selectedAddress, this.cartItemList)
      .subscribe({
        next: (response: any) => {
          console.log('Order placed successfully!', response);

          // Build the email context
          const orderContext: OrderEmailContext = {
            orderId: response.orderId,
            customerName: response.userName,
            items: response.orderItems.map((item: any) => ({
              orderItemId: item.orderItemId,
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity + item.shippingCharge
            })),
            totalAmount: this.totalPrice,
            shippingAddress: this.address,
            orderDate: new Date(response.createdAt)
          };
          console.log('Order Context:', orderContext);

          // Send the email(s)
          this.emailservice.sendOrderConfirmationEmail('mohammed.ka@experionglobal.com', orderContext)
            .subscribe({
              next: () => {
                console.log('Order confirmation email sent successfully');
                // Also send the “Order Request” email
                this.emailservice.sendOrderRequestEmail('raznalrich@gmail.com', orderContext)
                  .subscribe({
                    next: () => {
                      console.log('Order request email sent successfully');
                      this.router.navigate(['/thankyou']);
                    },
                    error: (emailError) => {
                      console.error('Failed to send order request email:', emailError);
                      // Navigate anyway
                      this.router.navigate(['/thankyou']);
                    }
                  });
              },
              error: (emailError) => {
                console.error('Failed to send order confirmation email:', emailError);
                this.router.navigate(['/thankyou']);
              }
            });
        },
        error: (err) => console.error('Error placing order', err),
      });
  }

  /**
   * Called when an item is deleted from the cart
   */
  onItemDeleted(deletedProductId: number) {
    console.log(`Product with ID ${deletedProductId} has been removed from the cart.`);

    // Remove from the array we use for display
    this.CartItems = this.CartItems.filter(item => item.id !== deletedProductId);
    this.cartItemList = this.cartItemList.filter((item: any) => item.productId !== deletedProductId);

    // Recalculate
    this.calculateTotalPrice();

    // Update global signals by re-fetching the cart (or do it manually)
    this.global.getCartCount().subscribe();
  }

  onSendReplay(email: string, subject: string) {
    this.apis.sendMail('raznalrich@gmail.com', 'Order confirmed', this.emailTemplate)
      .subscribe({
        next: (response) => {
          console.log('Email sent successfully', response);
          alert("Email sent successfully");
        },
        error: (error) => {
          console.error('Error sending email:', error);
        }
      });
  }
}
