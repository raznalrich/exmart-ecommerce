import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() size: string = '';
  @Input() imageUrl: string = '';
  @Input() status: string = '';
  @Input() statusIcon: string = '';
}
