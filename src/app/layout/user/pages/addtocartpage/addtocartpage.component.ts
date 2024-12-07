import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../../ui/checkoutbutton/checkoutbutton.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";

@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtocartpageComponent, CheckoutbuttonComponent, AddtoCartDeletebtnComponent],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {

}
