import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingDetailComponent } from '../billing-detail/billing-detail.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ApiServiceService } from '../../../../services/api-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-orderlist-table',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, OrderPopupComponent, DatePipe],
  templateUrl: './orderlist-table.component.html',
  styleUrl: './orderlist-table.component.scss',
})
export class OrderlistTableComponent {
  @Input() OrderList: any[] = [];

  selectedStatus: number = 0;
  selectedOrder: any = null;
  OrderDetailsByID: any;
  selectedOrderItemId: any;

  editingShippingCharge: number | null = null;
  tempShippingCharge: number | null = null;

  constructor(public api: ApiServiceService) {}

  ngOnInit() {
    console.log('from order table component');
    console.log(this.OrderList);

    document
      .getElementById('confirmModal')
      ?.addEventListener('hidden.bs.modal', () => {
        this.closeModal();
      });

    document
      .getElementById('orderDetailModal')
      ?.addEventListener('hidden.bs.modal', () => {
        this.closeModal();
      });
  }

  // Open the modal and store the selected item and status
  openConfirmationModal(item: any) {
    this.selectedOrder = item; // Store the selected item (order)
    this.selectedStatus = item.status;
    const tableContainer = document.querySelector('.table-container');
    tableContainer?.classList.add('blur-background');
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
        productStatusId: this.selectedStatus,
      };
      console.log(OrderListDTO);
      this.api.updateOrderStatus(OrderListDTO).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  openOrderDetailModal(orderId: number, orderItemId: number) {
    this.selectedOrderItemId = orderItemId;

    this.api.GetOrderDetailById(orderId).subscribe((res: any) => {
      this.OrderDetailsByID = res;

      console.log(this.OrderDetailsByID);
      console.log(this.OrderDetailsByID.orderItems);
    });

    const modalElement = document.getElementById('orderDetailModal');
    const modalInstance = new bootstrap.Modal(modalElement!);
    const tableContainer = document.querySelector('.table-container');
    tableContainer?.classList.add('blur-background');
    modalInstance.show();
  }

  closeModal() {
    const tableContainer = document.querySelector('.table-container');
    tableContainer?.classList.remove('blur-background');
  }

  startEdit(orderItemId: number, currentCharge: number) {
    this.editingShippingCharge = orderItemId;
    this.tempShippingCharge = currentCharge;
  }

  cancelEdit() {
    this.editingShippingCharge = null;
    this.tempShippingCharge = null;
  }

  saveShippingCharge(item: any) {
    if (this.tempShippingCharge === null || this.tempShippingCharge === item.shippingCharge) {
      this.cancelEdit();
      return;
    }

    const updateData = {
      orderItemId: item.orderItemId,
      shippingCharge: this.tempShippingCharge
    };

    this.api.updateShippingCharge(updateData).subscribe({
      next: (res: any) => {
        item.shippingCharge = this.tempShippingCharge;
        this.editingShippingCharge = null;
        this.tempShippingCharge = null;
        alert('Shipping charge updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating shipping charge:', error);
        alert('Failed to update shipping charge');
        this.cancelEdit();
      }
    });
  }

}
