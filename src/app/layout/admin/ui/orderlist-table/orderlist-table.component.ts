import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderlist-table',
  standalone: true,
  imports: [CurrencyPipe,FormsModule],
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
    console.log('Order status updated:', order);
  }

  calculateTotalQuantity(items: any[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }


}
