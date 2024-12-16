import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../../ui/checkoutbutton/checkoutbutton.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { AddtoCartLikebtnComponent } from "../../ui/addto-cart-likebtn/addto-cart-likebtn.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent, CurrencyPipe],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {

}
