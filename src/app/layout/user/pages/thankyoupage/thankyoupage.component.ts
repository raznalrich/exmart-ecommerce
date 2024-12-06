import { Component } from '@angular/core';
import { ItemsInOrderComponent } from "../../ui/items-in-order/items-in-order.component";
import { ApiServiceService } from '../../../../services/api-service.service';

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
  imports: [ItemsInOrderComponent],
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.scss'
})
export class ThankyoupageComponent {

  orders: Order[] = [];

  constructor(public api:ApiServiceService){}

  ngOnInit(){
    // this.api.getItemsInOrder().subscribe((res:Order)=>{

    // })
  }


}
