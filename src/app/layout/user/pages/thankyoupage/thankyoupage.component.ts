import { Component } from '@angular/core';
import { ItemsInOrderComponent } from "../../ui/items-in-order/items-in-order.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { OrderTrackingBarComponent } from "../../ui/order-tracking-bar/order-tracking-bar.component";
import { OrderconfirmationanimationComponent } from "../../ui/orderconfirmationanimation/orderconfirmationanimation.component";

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
  imports: [ItemsInOrderComponent, OrderTrackingBarComponent, OrderconfirmationanimationComponent],
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.scss'
})
export class ThankyoupageComponent {

  orders: Order[] = [];

  constructor(public api:ApiServiceService){}

  ngOnInit(){
    this.api.getItemsInOrder().subscribe((res:any)=>{
      this.orders = res
      console.log(this.orders)
    })
  }


}
