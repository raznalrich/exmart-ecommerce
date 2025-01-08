import { address } from './../../interfaces/AddressInterface';
import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../../ui/checkoutbutton/checkoutbutton.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { AddtoCartLikebtnComponent } from "../../ui/addto-cart-likebtn/addto-cart-likebtn.component";
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { ProductDisplayingBarComponent } from "../../ui/product-displaying-bar/product-displaying-bar.component";
import { ApiService } from '../../../../api.service';
import { forkJoin, map, Observable } from 'rxjs';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { EmailService } from '../../../../services/email.service';
export interface OrderEmailContext {
  orderId: number;
  customerName: string;
  items: Array<{
    orderItemId:number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}
interface Product {
  name: any;
  price: any;
}
interface ProductDetails {
  id: number;
  name: string;
  primaryImageUrl: string;
  price: number;
  colorId: number;
  sizeId: number;
  color?: string;
  size?: string;
}
@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent, CurrencyPipe, RouterLink, LongButtonComponent, ProductDisplayingBarComponent],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {
  productDetails:any
  userId:number=0;
  emailTemplate: string = '';

id:any
data:any
cartItemList:any
selectedAddress:any
address:string='';
shippingCharge:number=0;
orderContext:any;
addressType:string='';
totalPrice: number = 0;
  constructor(public api: ApiService,public apis:ApiServiceService, private route: ActivatedRoute,public global:GlobalService, private router: Router,
    public emailservice:EmailService
  ) {
    this.global.getUserId();
  }

  CartItems: ProductDetails[] = []; // Array to store fetched product details
  productIds: number[] = []; // Collection of product IDs
  ngOnInit(){
    // this.api.getProductsById(this.id).subscribe((res: any) => {
    //   this.productDetails = res;
    //   // console.log("data",this.data);

    // });
    this.userId = this.global.userId();
    if(this.global.selectedAddressId() == ''){
      // this.router.navigate(['/addressconfirm']);
    }

    if(this.global.selectedAddressId()){
      this.selectedAddress = +this.global.selectedAddressId();
      this.loadAddressType(this.selectedAddress);
      this.loadAddress(this.selectedAddress);
    }

    const cartItems = this.global.signalCartList();
    this.cartItemList = this.global.signalCartList();
    this.productIds = cartItems.map(item => item.productId);

    console.log('Cart list:', cartItems);
    console.log('Product IDs:', this.productIds);
    if(this.global.selectedAddressId()==''){

      this.fetchCartItems(cartItems);
    }
    // console.log(this.CartItems);
  }
  loadAddress(addressId:number) {
    this.apis.getAddressById(addressId).subscribe({
      next: (formattedAddress) => {
        this.address = formattedAddress;
      },
      error: (error) => {
        console.error('Error fetching address:', error);
      }
    });
  }
  loadAddressType(addressId:number){
    this.apis.getAddressTypeById(addressId).subscribe({
      next:(typeID)=>{
this.addressType=typeID;
console.log('type',this.addressType);
this.fetchCartItems( this.global.signalCartList());

      },
      error: (error) => {
        console.error('Error fetching address:', error);
      }
    })
  }

  fetchCartItems(cartItems: any[]) {
    const requests = this.productIds.map((id) => this.apis.getProductsById(id));

    forkJoin(requests).subscribe(
      (responses: any[]) => {
        // Map responses with cart item details including color and size
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
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // ... rest of the code remains the same ...

  calculateTotalPrice() {
    this.totalPrice = this.CartItems.reduce((total, product) => {
      // Find the corresponding cart item to get the quantity
      const cartItem = this.cartItemList.find((item: any) => item.productId === product.id);
      const quantity = cartItem ? cartItem.quantity : 0;
      if(+this.addressType == 1 ){
        console.log('shipping charge');

        this.shippingCharge = this.shippingCharge + 49
        return total + ((product.price * quantity)+49)
      }
      else{
        console.log("calculating total amount");

        return total + (product.price * quantity);
      }
    }, 0);

    // Add delivery charge if address is 3

    console.log(this.totalPrice);
  }
  setOrderFromCart() {
    this.global.signalOrderList.set([...this.cartItemList]);
  }
  redirectToHome(){
    this.router.navigate(['/home']);
  }
  placeOrder() {
    this.setOrderFromCart();
    this.apis.placeOrder(this.userId, this.selectedAddress, this.cartItemList)
      .subscribe({
        next: (response: any) => {
          console.log('Order placed successfully!', response);



          const orderContext: OrderEmailContext = {
            orderId: response.orderId.toString(),
            customerName: response.userName,
            items: response.orderItems.map((item:any) => ({
              orderItemId: item.orderItemId,
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity + item.shippingCharge
            })),
            totalAmount: this.totalPrice,
            shippingAddress: this.address, // You'll need to format this
            orderDate: new Date(response.createdAt)
          };
          this.orderContext = orderContext;
          console.log('orderd items ids',orderContext);

              // Send order confirmation email
              this.emailservice.sendOrderConfirmationEmail(response.email, orderContext).subscribe({
                next: () => {
                  console.log('Order confirmation email sent successfully');
                  this.emailservice.sendOrderRequestEmail('raznalrich@gmail.com', orderContext).subscribe({
                    next: () => {
                      console.log('Order confirmation email sent successfully');
                      this.router.navigate(['/thankyou']);
                    },
                    error: (emailError) => {
                      console.error('Failed to send order confirmation email:', emailError);
                      // Navigate to thank you page even if email fails
                      this.router.navigate(['/thankyou']);
                    }
                  });
                  // this.router.navigate(['/thankyou']);
                },
                error: (emailError) => {
                  console.error('Failed to send order confirmation email:', emailError);
                  // Navigate to thank you page even if email fails
                  this.router.navigate(['/thankyou']);
                }
              });
            // },
            // (error) => {
            //   console.error('Failed to fetch product names:', error);
            // }
          // );
        },
        error: (err) => console.error('Error placing order', err),
      });
  }
onSendReplay(email:string,subject:string) {

  this.apis.sendMail('raznalrich@gmail.com', 'Order confirmed', this.emailTemplate)
  .subscribe({
    next: (response) => {
      console.log('Email sent successfully', response);
      alert("Email sent successfully")
    },
    error: (error) => {
      console.error('Error sending email:', error);
    }
  });

}

}
