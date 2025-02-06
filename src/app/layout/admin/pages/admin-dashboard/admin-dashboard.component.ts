import { Component, NgModule, SimpleChanges } from '@angular/core';
import { SidebarComponent } from "../../ui/sidebar/sidebar.component";
import { AdminValuesDisplayingButtonComponent } from "../../ui/admin-values-displaying-button/admin-values-displaying-button.component";
import { AdminWeeklyChartDispComponent } from "../../ui/admin-weekly-chart-disp/admin-weekly-chart-disp.component";
import { AdminRecentOrdersInDashBoardComponent } from "../../ui/admin-recent-orders-in-dash-board/admin-recent-orders-in-dash-board.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { OrderItem } from '../../interface/order.interface';
import { formatDate } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminTopProductsChartComponent } from "../../ui/admin-top-products-chart/admin-top-products-chart.component";



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, AdminValuesDisplayingButtonComponent,
    AdminWeeklyChartDispComponent, AdminRecentOrdersInDashBoardComponent, RouterLink, FormsModule, AdminTopProductsChartComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {

  allOrders: OrderItem[] = [];
  pendingOrders: number = 0;
  shippedOrders : number = 0;
  deliveredOrders : number = 0;
  currentYearOrders: number = 0;
  latestProducts: Array<{ productName: string; orderDate: string; imageUrl:string; quantity :number}> = [];
  monthlyOrderCounts: number[] = new Array(12).fill(0);
  availableYears: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(public api:ApiServiceService,public router: Router){
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from(
      { length: 3 },
      (_, i) => currentYear - i
    ).sort((a, b) => b - a);
  }


  ngOnInit(){

    this.api.getOrderDetail().subscribe((res: OrderItem[]) => {
      this.allOrders = res;
      console.log(this.allOrders);

      this.calculatePendingOrders();
      this.calculateShippedOrders();
      this.calculateDevileredOrders()
      this.calculateCurrentYearOrders();
      this.getLatestProducts();
      this.calculateMonthlyOrders(this.selectedYear);
    });
  };
   calculatePendingOrders() {
    this.pendingOrders = this.allOrders.filter(order => order.status === 1).length;
    console.log('pend',this.pendingOrders);
  }
  calculateShippedOrders() {
    this.shippedOrders = this.allOrders.filter(order => order.status === 2).length;
    console.log('ship',this.shippedOrders);
  }
  calculateDevileredOrders() {
    this.deliveredOrders = this.allOrders.filter(order => order.status === 3).length;
    console.log('deliver',this.deliveredOrders);
  }

  calculateCurrentYearOrders() {
    const currentYear = new Date().getFullYear();
    this.currentYearOrders = this.allOrders.filter(order =>
      new Date(order.orderDate).getFullYear() === currentYear
    ).length;
    console.log(this.currentYearOrders);

  }

  getLatestProducts() {
    this.latestProducts = this.allOrders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5)
      .map(order => ({
        productName: order.productName,
        imageUrl: order.primaryImageUrl,
        orderDate: formatDate(order.orderDate, 'dd/MM/yyyy', 'en-US'),
        quantity : order.quantity
      }));
      console.log("latest pross: ",this.latestProducts);
  }

onYearChange(event: Event) {
  const selectedYear = Number((event.target as HTMLSelectElement).value);
  this.calculateMonthlyOrders(selectedYear);
}
  calculateMonthlyOrders(year: number) {
    this.monthlyOrderCounts = new Array(12).fill(0);

    this.allOrders.forEach(order => {
      const orderDate = new Date(order.orderDate);

      // Count orders for selected year
      if (orderDate.getFullYear() === year) {
          this.monthlyOrderCounts[orderDate.getMonth()]++;
      }
  });
  console.log(`Orders for year ${year}:`, this.monthlyOrderCounts);

    // this.allOrders
    //   .filter(order => {
    //     const orderDate = new Date(order.orderDate);
    //     return orderDate.getFullYear() === Number(this.selectedYear);

    //  })
    //   .forEach(order => {
    //     const month = new Date(order.orderDate).getMonth();
    //     this.monthlyOrderCounts[month]++;
    //   });
        console.log('selected Year: ',this.selectedYear);
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('Changes testing:', this.monthlyOrderCounts);

  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }


  MoveToOrdersPage(){
    this.router.navigate(['/admin/orderlist',]);
  }
}
