import { Component } from '@angular/core';
import { OrderlistTableComponent } from "../../ui/orderlist-table/orderlist-table.component";
import { SidebarComponent } from "../../ui/sidebar/sidebar.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { SearchbarComponent } from "../../ui/searchbar/searchbar.component";
import { AdminValuesDisplayingButtonComponent } from "../../ui/admin-values-displaying-button/admin-values-displaying-button.component";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderlistTableComponent, SearchbarComponent, AdminValuesDisplayingButtonComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {

  orderlist:any[]=[];

  constructor(public api:ApiServiceService){}

  ngOnInit(){
    this.api.getOrderList().subscribe((res:any)=>{
     this.orderlist = res;
      console.log(this.orderlist)
    })

  }
}


