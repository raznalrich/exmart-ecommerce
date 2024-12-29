import { Component, Input } from '@angular/core';
import { AddtoCartDeletebtnComponent } from "../addto-cart-deletebtn/addto-cart-deletebtn.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-displaying-bar',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent,CurrencyPipe],
  templateUrl: './product-displaying-bar.component.html',
  styleUrl: './product-displaying-bar.component.scss'
})
export class ProductDisplayingBarComponent {
  @Input() productImage: string = '';
  @Input() productName: string = '';
  @Input() productColor: string = '';
  @Input() productSize: string = '';
  @Input() productPrice: number = 0;
}
