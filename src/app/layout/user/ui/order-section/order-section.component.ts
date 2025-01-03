import { Component, Input } from '@angular/core';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order-section',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './order-section.component.html',
  styleUrl: './order-section.component.scss'
})
export class OrderSectionComponent {
  @Input() title: string = '';
  @Input() icon: string = ''; // Bootstrap icon class
  @Input() maxHeight: string = '200px'; // Maximum height of the section
  @Input() items:any[] = [];
  ngOnInit(){
    console.log(this.items);

  }
}
