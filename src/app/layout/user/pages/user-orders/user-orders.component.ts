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
      imageUrl: 'hoodie-image-url',
      status: 'Shipped',
      statusIcon: 'bi bi-truck',
    },
  ];

  orderHistory = [
    {
      title: 'Note Book',
      type: 'spiral note',
      size: 'Medium',
      imageUrl: 'notebook-image-url',
      status: 'Delivered',
      statusIcon: 'bi bi-box-check',
    },
    {
      title: 'Laptop Bag',
      type: 'Wildcraft',
      size: 'Medium',
      imageUrl: 'laptopbag-image-url',
      status: 'Delivered',
      statusIcon: 'bi bi-box-check',
    },
  ];
}
