import { Component } from '@angular/core';
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
  imports: [RouterLink,ItemsInOrderComponent, OrderConfirmationTickAnimationComponent, LongButtonComponent, CurrencyPipe, WebFeedbackSectionComponent],
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.scss'
})
export class ThankyoupageComponent {
  productDetails:any
id:any
data:any
cartItemList:any
selectedAddress:any
totalPrice: number = 0;
  orders: Order[] = [];
  isContentVisible = false;
  ContentVisible = true;

  constructor(public api: ApiService,public apis:ApiServiceService, private route: ActivatedRoute,public global:GlobalService, private router: Router,
      private animationStateService:AnimationStateService
  ){}
  CartItems: ProductDetails[] = []; // Array to store fetched product details
productIds: number[] = [];
  ngOnInit(){
    if(this.global.selectedAddressId()){
      this.selectedAddress = this.global.selectedAddressId();
    }
    const cartItems = this.global.signalCartList();
    this.cartItemList = this.global.signalCartList();
    this.productIds = cartItems.map(item => item.productId);

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
      this.totalPrice = this.CartItems.reduce((total, product) => total + (product.price || 0), 0);
      // if(this.selectedAddress==1||this.selectedAddress==2){

      //   this.totalPrice = this.totalPrice+0;
      // }
      if(this.selectedAddress==3){
        this.totalPrice = this.totalPrice+50;

      }
      console.log(this.totalPrice);

    }


}
