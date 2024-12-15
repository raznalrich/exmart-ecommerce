import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkoutbutton',
  standalone: true,
  imports: [],
  templateUrl: './checkoutbutton.component.html',
  styleUrl: './checkoutbutton.component.scss'
})
export class CheckoutbuttonComponent {
 @Input() buttonName: string = '';
}
