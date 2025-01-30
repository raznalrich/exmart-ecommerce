import { Component, Input } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { BillingDetailComponent } from '../billing-detail/billing-detail.component';
import { ShipmentDetailComponent } from '../shipment-detail/shipment-detail.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { ProductDisplayingBarComponent } from "../../../user/ui/product-displaying-bar/product-displaying-bar.component";

@Component({
  selector: 'app-order-popup',
  standalone: true,
  imports: [ProductDetailComponent, BillingDetailComponent, ShipmentDetailComponent, CustomerDetailComponent, ProductDisplayingBarComponent],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.scss'
})
export class OrderPopupComponent {
@Input() OrderDetailsByID : any
@Input() selectedOrderItemId : any;


  closeCard() {
    console.log('Card closed'); // Replace this with actual functionality
    // Example: Add logic to hide the card or navigate away
  }


}
