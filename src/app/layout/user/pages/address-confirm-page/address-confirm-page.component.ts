import { Component, Input } from '@angular/core';
import { CheckoutbuttonComponent } from '../../ui/checkoutbutton/checkoutbutton.component';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { AddressCardComponent } from '../../ui/address-card/address-card.component';
import { ApiService } from '../../../../api.service';
import { RouterLink } from '@angular/router';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { address } from '../../interfaces/AddressInterface';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-address-confirm-page',
  standalone: true,
  imports: [CheckoutbuttonComponent, AddAddressButtonComponent, AddressCardComponent, RouterLink, LongButtonComponent],
  templateUrl: './address-confirm-page.component.html',
  styleUrl: './address-confirm-page.component.scss'
})
export class AddressConfirmPageComponent {
    constructor(public api:ApiServiceService, public global:GlobalService){
      this.global.getUserId()
    }

  @Input()address:any={
    name:'',
    badgeName:'',
    place:'',
    buildingNo:'',
    pincode:'',
    city:'',
    district:'',
    state:'',
    country:'',
    phoneNo:''
    }
selectedAddress?:address;
userId:number=0;
    ngOnInit() {
      this.userId=this.global.userId()
      this.address= this.api.getAddressByUserId(this.userId).subscribe((res: any) => {
         this.address = res;

         console.log(this.address);
         // console.log("Name : ",this.arr[0].name);
     }
   )}

   onAddAddress() {
    this.selectedAddress = undefined;
  }
}
