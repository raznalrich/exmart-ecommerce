import { Component, Input } from '@angular/core';
import { OrderSectionComponent } from '../../ui/order-section/order-section.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderSectionComponent,CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  constructor(public api:ApiServiceService,public global:GlobalService){
    this.global.getUserId();
  }
  @Input() tabs = ['In Transit', 'Pending'];
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

  userId: any;

  ngOnInit() {
    this.loadOrders();
    this.userId = this.global.userId();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private loadOrders() {
    this.isLoading = true;
    this.error = null;

    this.api.getAllOrderList().subscribe({
      next: (res: any) => {
        this.inTransitOrders = res.filter((order:any) => order.userId === this.userId);
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
