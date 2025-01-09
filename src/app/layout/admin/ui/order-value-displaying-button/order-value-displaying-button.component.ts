import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-value-displaying-button',
  standalone: true,
  imports: [],
  templateUrl: './order-value-displaying-button.component.html',
  styleUrl: './order-value-displaying-button.component.scss'
})
export class OrderValueDisplayingButtonComponent {

    @Input() count: number = 0;
    @Input() label: string = 'Label';
    @Input() iconSrc: string = '';

}
