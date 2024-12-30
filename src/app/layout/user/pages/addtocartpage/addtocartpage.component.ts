import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../../ui/checkoutbutton/checkoutbutton.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { AddtoCartLikebtnComponent } from "../../ui/addto-cart-likebtn/addto-cart-likebtn.component";
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { ProductDisplayingBarComponent } from "../../ui/product-displaying-bar/product-displaying-bar.component";

@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent, CurrencyPipe, RouterLink, LongButtonComponent, ProductDisplayingBarComponent],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {

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
