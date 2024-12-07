import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-items-in-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './items-in-order.component.html',
  styleUrl: './items-in-order.component.scss'
})
export class ItemsInOrderComponent {
  @Input() orders: any;

  ngOnInit(){
    console.log(this.orders)
  }

}
