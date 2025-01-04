import { Component } from '@angular/core';
import { OrderSectionComponent } from '../../ui/order-section/order-section.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderSectionComponent,CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  constructor(public api:ApiServiceService){}
  tabs = ['In Transit', 'Pending'];
  activeTab = 'In Transit';
  inTransitOrders: any[] = [];
  orderHistorylist: any[] = [];
  isLoading = true;
  error: string | null = null;

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

  userId: number = 1;

  ngOnInit() {
    this.loadOrders();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private loadOrders() {
    this.isLoading = true;
    this.error = null;

    this.api.getAllOrderList().subscribe({
      next: (res: any) => {
        this.inTransitOrders = res.filter((order: { userId: number }) => order.userId === this.userId);
        this.orderHistorylist = res.filter((order: { userId: number }) => order.userId === this.userId);
        console.log("filtered orders", this.inTransitOrders);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.error = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
