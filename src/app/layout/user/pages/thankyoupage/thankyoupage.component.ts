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
  imports: [ItemsInOrderComponent, OrderConfirmationTickAnimationComponent, LongButtonComponent, CurrencyPipe, WebFeedbackSectionComponent],
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.scss'
})
export class ThankyoupageComponent {

  orders: Order[] = [];
  isContentVisible = false;
  ContentVisible = true;

  constructor(private api:ApiServiceService,
      private animationStateService:AnimationStateService
  ){}

  ngOnInit(){
    this.api.getItemsInOrder().subscribe((res:any)=>{
      this.orders = res
      console.log(this.orders)

      // Then, listen for animation completion
      this.animationStateService.animationComplete$.subscribe(isComplete => {
        setTimeout(() => {
          if (isComplete) {
            this.isContentVisible = true;
            this.ContentVisible = false;
          }
        },1000)

      });
    })

  }


}
