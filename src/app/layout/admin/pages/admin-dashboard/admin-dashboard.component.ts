import { Component } from '@angular/core';
import { SidebarComponent } from "../../ui/sidebar/sidebar.component";
import { AdminValuesDisplayingButtonComponent } from "../../ui/admin-values-displaying-button/admin-values-displaying-button.component";
import { AdminWeeklyChartDispComponent } from "../../ui/admin-weekly-chart-disp/admin-weekly-chart-disp.component";
import { AdminRecentOrdersInDashBoardComponent } from "../../ui/admin-recent-orders-in-dash-board/admin-recent-orders-in-dash-board.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { Product } from '../../../user/interfaces/productInterface';
import { Order } from '../../interface/order.interface';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent,AdminValuesDisplayingButtonComponent,
    AdminWeeklyChartDispComponent, AdminRecentOrdersInDashBoardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {
  allOrders: Order[] = [];
  products: Product[] = [];
  pendingOrdersCount = 0;
  pendingOrdersAmount = 0;
  latestOrders: Order[] = [];
  monthlyOrders: number[] = new Array(12).fill(0);
  // items: any;


  // allOrders: any;
  // products: any;
  constructor(public api:ApiServiceService){}


ngOnInit(){

  this.api.getProducts().subscribe((res: any) => {
    this.products = res;
    // this.displayedProducts = [...this.allProList];
    // console.log(this.allProList)
    console.log('DisplayedPro API:', this.products);
  });

  this.api.getAllOrderList().subscribe((res: any) => {
    this.allOrders = res;
    console.log('All Orders API:', this.allOrders);
  });


      this.calculatePendingOrders();
      this.calculatePendingAmount();
      this.getLatestOrders();
      this.calculateMonthlyOrders();
}

calculatePendingOrders() {
  this.pendingOrdersCount = this.allOrders.filter(
    order => order.product_StatusId == 1
  ).length;

  console.log('pendingOrders:', this.pendingOrdersCount);
}

calculatePendingAmount() {
  const pendingOrders = this.allOrders.filter(
    order => order.product_StatusId === 1
  );

  this.pendingOrdersAmount = pendingOrders.reduce((total, order) => {
    const orderProduct = this.products.find(p => p.id === order.orderId);
    return total + (orderProduct?.price || 0);
  }, 0);

  console.log('ordersAmount:', this.pendingOrdersAmount);
}

getLatestOrders() {
  this.latestOrders = [...this.allOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  console.log('latestOrders:',this.latestOrders);

}

calculateMonthlyOrders() {
  this.allOrders.forEach(order => {
    const month = new Date(order.createdAt).getMonth();
    this.monthlyOrders[month]++;
  });
  console.log('monthlyorders:',this.monthlyOrders);

}


}
