import { Component } from '@angular/core';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { CurrencyPipe } from '@angular/common';
import { ProductDisplayingBarComponent } from "../../ui/product-displaying-bar/product-displaying-bar.component";

@Component({
  selector: 'app-order-preview-page',
  standalone: true,
  imports: [LongButtonComponent, CurrencyPipe, ProductDisplayingBarComponent],
  templateUrl: './order-preview-page.component.html',
  styleUrl: './order-preview-page.component.scss'
})
export class OrderPreviewPageComponent {

  CartItems = [
    {
      id:1,
      itemName: 'T Shirt',
      itemImage: '',
      color: 'Black',
      size: 'M',
      rate: 299.00
    },
    {
      id:2,
      itemName: 'T Shirt',
      color: 'white',
      size: 'XXL',
      rate: 399.00
    },
    {
      id:3,
      itemName: 'T Shirt',
      color: 'Red',
      size: 'M',
      rate: 99.00
    }
  ]
}
