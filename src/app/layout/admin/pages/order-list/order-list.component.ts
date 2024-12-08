import { Component } from '@angular/core';
import { OrderlistTableComponent } from "../../ui/orderlist-table/orderlist-table.component";
import { SidebarComponent } from "../../ui/sidebar/sidebar.component";
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderlistTableComponent,],
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


