import { Component } from '@angular/core';
import { OrderSectionComponent } from '../../ui/order-section/order-section.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderSectionComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  inTransitOrders = [
    {
      title: 'HOODIE',
      type: 'woolen',
      size: 'Medium',
      imageUrl: 'https://media.karousell.com/media/photos/products/2023/4/29/gildan_zipup_hoodie_1682750904_29598b39.jpg',
      status: 'Shipped',
      statusIcon: 'bi bi-truck',
    },
  ];

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

  
}
