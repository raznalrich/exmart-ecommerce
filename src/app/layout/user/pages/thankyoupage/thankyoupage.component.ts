import { Component, Input } from '@angular/core';
import { ItemsInOrderComponent } from "../../ui/items-in-order/items-in-order.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { OrderTrackingBarComponent } from "../../ui/order-tracking-bar/order-tracking-bar.component";
import { OrderconfirmationanimationComponent } from "../../ui/orderconfirmationanimation/orderconfirmationanimation.component";
import { OrderConfirmationTickAnimationComponent } from "../../ui/order-confirmation-tick-animation/order-confirmation-tick-animation.component";
import { AnimationStateService } from '../../../../services/animation-state.service';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { CurrencyPipe } from '@angular/common';
import { WebFeedbackSectionComponent } from "../../ui/web-feedback-section/web-feedback-section.component";
import { GlobalService } from '../../../../global.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { forkJoin } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThankYouPurchaseComponent } from "../../ui/thank-you-purchase/thank-you-purchase.component";
import { OrderEmailContext } from '../../interfaces/OrderEmailContext';

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
interface Order {
  orderId: string;
  orderDate: string;
  items: Item[];
  totalAmount: string;
  deliveryCharge: string;
}

interface Item {
  name: string;
  size: string;
  color: string;
  price: string;
}

@Component({
  selector: 'app-thankyoupage',
  standalone: true,
  imports: [RouterLink, ItemsInOrderComponent, OrderConfirmationTickAnimationComponent, LongButtonComponent, CurrencyPipe, WebFeedbackSectionComponent, ThankYouPurchaseComponent],
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.scss',

})
export class ThankyoupageComponent {
  isVisible = true;
  shippingCharge:number=0;
  orderContexts:OrderEmailContext[]=[];
  orderPlaced:string='Order Placed'
  productDetails:any
 @Input() orderContext:any;
 userId:number=0;
id:any
data:any
cartItemList:any
selectedAddress:any
addressType:string='';
address:string='';


totalPrice: number = 0;
  orders: Order[] = [];
  isContentVisible = false;
  ContentVisible = true;

  constructor(public api: ApiService,public apis:ApiServiceService, private route: ActivatedRoute,public global:GlobalService, private router: Router,
      private animationStateService:AnimationStateService
  ){
    this.global.getUserId();
    this.orderContext = this.router.getCurrentNavigation()?.extras.state?.['orderContext'];
    console.log('Received Order Context:', this.orderContext);
  }
  CartItems: ProductDetails[] = []; // Array to store fetched product details
productIds: number[] = [];
  ngOnInit(){
    this.userId = this.global.userId();
    if(this.global.selectedAddressId()){
      this.selectedAddress = +this.global.selectedAddressId();
      this.loadAddressType(this.selectedAddress);
      this.loadAddress(this.selectedAddress);
    }
    const cartItems = this.global.signalCartList();
    this.cartItemList = this.global.signalCartList();
    this.productIds = cartItems.map(item => item.productId);
    console.log('order context',this.global.orderContext());
    this.orderContexts = this.global.orderContext();
    console.log('order contexts',this.orderContexts);


    console.log('Cart list:', cartItems);
    console.log('Product IDs:', this.productIds);

    this.fetchCartItems(cartItems);
    // this.api.getItemsInOrder().subscribe((res:any)=>{
    //   this.orders = res
    //   console.log(this.orders)

      // Then, listen for animation completion
      this.animationStateService.animationComplete$.subscribe(isComplete => {
        setTimeout(() => {
          if (isComplete) {
            this.isContentVisible = true;
            this.ContentVisible = false;
          }
        },1000)

      });
    }
    onDelete() {
      this.global.selectedAddressId.set('');

      this.apis.deleteCartById(this.userId).subscribe({
        next: () => {
          // this.refreshAddressList();
          console.log('cart cleared');
          this.router.navigate(['/']);
          this.global.getCartCount();
        },
        error: (error) => {
          console.error('Error deleting address', error);
        }
      });

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
}
