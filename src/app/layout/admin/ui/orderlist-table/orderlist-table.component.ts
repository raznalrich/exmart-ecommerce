import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingDetailComponent } from "../billing-detail/billing-detail.component";
import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
import { OrderPopupComponent } from "../order-popup/order-popup.component";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ApiServiceService } from '../../../../services/api-service.service';
declare var bootstrap: any;


@Component({
  selector: 'app-orderlist-table',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, OrderPopupComponent, DatePipe],
  templateUrl: './orderlist-table.component.html',
  styleUrl: './orderlist-table.component.scss'
})
export class OrderlistTableComponent {
  @Input() OrderList:any [] = [];

  selectedStatus: number = 0;
  selectedOrder: any = null;

  OrderDetailsByID : any

  constructor(public api:ApiServiceService){}

  ngOnInit(){
    console.log("from order table component")
    console.log(this.OrderList)

  }

  // Open the modal and store the selected item and status
  openConfirmationModal(item: any) {
    this.selectedOrder = item; // Store the selected item (order)
    this.selectedStatus = item.status
    const modalElement = document.getElementById('confirmModal');
    const modalInstance = new bootstrap.Modal(modalElement!);
    modalInstance.show();
  }

  // openActionModal(OrderId : number) {
  //   const modalElement = document.getElementById('')
  // }

  // Utility function to get status name for display
  getStatusName(statusId: number): string {
    const statusMap: { [key: number]: string } = {
      1: 'Pending',
      2: 'Shipped',
      3: 'Delivered',
    };
    return statusMap[statusId] || 'Unknown';
  }

  confirmStatusChange() {

    if (this.selectedOrder && this.selectedStatus !== null) {
      const OrderListDTO = {
        orderItemId: this.selectedOrder.orderItemId,
        productStatusId: this.selectedStatus
      };
      console.log(OrderListDTO)
      this.api.updateOrderStatus(OrderListDTO).subscribe((res:any)=>{

        console.log(res)

      })
}

  }

  openOrderDetailModal(orderId:any){

    this.api.GetOrderDetailById(orderId).subscribe((res:any)=>{
        this.OrderDetailsByID = res
        console.log(this.OrderDetailsByID)
        console.log(this.OrderDetailsByID.orderItems)
    })

    const modalElement = document.getElementById('orderDetailModal');
    const modalInstance = new bootstrap.Modal(modalElement!);
    modalInstance.show();
  }

}
