import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BillingDetailComponent } from "../billing-detail/billing-detail.component";
import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
import { OrderPopupComponent } from "../order-popup/order-popup.component";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
declare var bootstrap: any;

@Component({
  selector: 'app-orderlist-table',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, BillingDetailComponent, CustomerDetailComponent, OrderPopupComponent,ConfirmModalComponent],
  templateUrl: './orderlist-table.component.html',
  styleUrl: './orderlist-table.component.scss'
})
export class OrderlistTableComponent {
  @Input() OrderList:any;

  ngOnInit(){
    console.log("from order table component")
    console.log(this.OrderList)

  }

  updateOrderStatus(order: any): void {
    const modal = new bootstrap.Modal(document.getElementById('confirm_modal'));
    modal.show();
  }

  calculateTotalQuantity(items: any[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }


}
