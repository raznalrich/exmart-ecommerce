import { Component } from '@angular/core';
import { OrderlistTableComponent } from '../../ui/orderlist-table/orderlist-table.component';
import { SidebarComponent } from '../../ui/sidebar/sidebar.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AdminValuesDisplayingButtonComponent } from '../../ui/admin-values-displaying-button/admin-values-displaying-button.component';
import { DateRangepickerComponent } from '../../ui/date-rangepicker/date-rangepicker.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    OrderlistTableComponent,
    ReactiveFormsModule,
    SearchbarComponent,
    AdminValuesDisplayingButtonComponent,
    DateRangepickerComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  orderlist: any[] = [];

  constructor(public api: ApiServiceService) {}

  ngOnInit() {
    this.api.getOrderDetails().subscribe((res: any) => {
      this.orderlist = res;
      console.log('orderlist', this.orderlist);
    });
  }
}
