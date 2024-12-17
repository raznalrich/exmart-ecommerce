import { Component, Input } from '@angular/core';
import { CheckoutbuttonComponent } from '../../ui/checkoutbutton/checkoutbutton.component';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { AddressCardComponent } from '../../ui/address-card/address-card.component';
import { ApiService } from '../../../../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-address-confirm-page',
  standalone: true,
  imports: [CheckoutbuttonComponent,AddAddressButtonComponent,AddressCardComponent,RouterLink],
  templateUrl: './address-confirm-page.component.html',
  styleUrl: './address-confirm-page.component.scss'
})
export class AddressConfirmPageComponent {

}
