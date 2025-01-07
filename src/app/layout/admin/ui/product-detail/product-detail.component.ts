import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
@Input() OrderDetailsByID : any
@Input() selectedOrderItemId :any;

get filteredOrderItem() {
  if (!this.OrderDetailsByID?.orderItems) return null;
  return this.OrderDetailsByID.orderItems.find(
    (item: any) => item.orderItemId === this.selectedOrderItemId
  );
}

}
