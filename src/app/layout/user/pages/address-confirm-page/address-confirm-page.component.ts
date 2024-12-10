import { Component, Input } from '@angular/core';
import { CheckoutbuttonComponent } from '../../ui/checkoutbutton/checkoutbutton.component';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { AddressCardComponent } from '../../ui/address-card/address-card.component';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-address-confirm-page',
  standalone: true,
  imports: [CheckoutbuttonComponent,AddAddressButtonComponent,AddressCardComponent,],
  templateUrl: './address-confirm-page.component.html',
  styleUrl: './address-confirm-page.component.scss'
})
export class AddressConfirmPageComponent {
  address:any;
@Input()buttonName:string='';
constructor(public api: ApiService) {}
  ngOnInit() {
   this.address= this.api.getProductDetails().subscribe((res: any) => {
      this.address = res;
      // console.log(this.address.addresses.name);
      console.log(this.address.addresses[0].name);
  }
)}
}
