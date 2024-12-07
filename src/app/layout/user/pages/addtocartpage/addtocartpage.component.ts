import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../ui/checkoutbutton/checkoutbutton.component";

@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtocartpageComponent, CheckoutbuttonComponent],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {

}
