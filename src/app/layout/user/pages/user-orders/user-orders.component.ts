import { Component } from '@angular/core';
import { OrderSectionComponent } from '../../ui/order-section/order-section.component';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderSectionComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  constructor(public api:ApiServiceService){}

  inTransitOrders = [ ];

  orderHistory = [
    {
      title: 'Note Book',
      type: 'spiral note',
      size: 'Medium',
      imageUrl: 'https://m.media-amazon.com/images/I/61eYApdaTDL._SL1100_.jpg',
      status: 'Delivered',
      statusIcon: 'bi bi-box-check',
    },
    {
      title: 'Laptop Bag',
      type: 'Wildcraft',
      size: 'Medium',
      imageUrl: 'staticimages/pro_bag.png',
      status: 'Delivered',
      statusIcon: 'bi bi-box-check',
    },
  ];
  orderlist:any[]=[];

userId:number = 1;
  ngOnInit() {
    this.api.getAllOrderList().subscribe((res: any) => {
      this.inTransitOrders = res.filter((order: { userId: number; }) => order.userId == this.userId);
      console.log("filtered orders", this.inTransitOrders);
    });
  }


}
