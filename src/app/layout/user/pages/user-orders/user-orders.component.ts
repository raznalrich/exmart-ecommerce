import { Component, Input } from '@angular/core';
import { OrderSectionComponent } from '../../ui/order-section/order-section.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderSectionComponent,CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
  constructor(public api:ApiServiceService,public global:GlobalService,private router: Router){
    this.global.getUserId();
  }
  @Input() tabs = ['Pending','In Transit', 'Delivered','Cancelled'];
  activeTab = 'Pending';
  pendingOrders:any[]=[];
  inTransitOrders: any[] = [];
  orderHistorylist: any[] = [];
  cancelledOrders:any[]=[];
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
  logout(): void {
    // Remove specific data (e.g., userId) from local storage
    localStorage.removeItem('userId');

    // Optionally clear all local storage
    localStorage.clear();

    this.router.navigate(['/login']);
  }
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

    this.api.getOrderItemList().subscribe({
      next: (res: any) => {

        this.inTransitOrders = res.filter((order:any) => order.userId === this.userId && order.status === 2 );
        console.log('in transit',this.inTransitOrders);

        this.pendingOrders = res.filter((order:any) => order.userId === this.userId &&  order.status ===1);
        this.cancelledOrders = res.filter((order:any) => order.userId === this.userId &&  order.status ===5);
        this.orderHistorylist = res.filter((order: any) => order.userId === this.userId && order.status === 3);
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
