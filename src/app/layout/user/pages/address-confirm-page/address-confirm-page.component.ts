import { CommonModule } from '@angular/common';
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
import { NewAddressComponent } from "../new-address/new-address.component";
import { map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address-confirm-page',
  standalone: true,
  imports: [CommonModule,CheckoutbuttonComponent, AddAddressButtonComponent, AddressCardComponent, RouterLink, LongButtonComponent, NewAddressComponent],
  templateUrl: './address-confirm-page.component.html',
  styleUrl: './address-confirm-page.component.scss'
})
export class AddressConfirmPageComponent {
    constructor(public api:ApiServiceService, public global:GlobalService, private location:Location){
      this.global.getUserId()
    }

  @Input()homeAddress:any={
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
workAddress:any;
selectedAddress?:address;
isAddProductVisible:boolean=false;
userId:number=0;
    ngOnInit() {
      this.userId=this.global.userId()
      this.workAddress = this.api.getAddress().subscribe((res: any) => {
        this.workAddress = res.filter((item: any) =>
          ['office'].includes(item.addressTypeName.toLowerCase())
        );
        console.log("work address", this.workAddress);
      });
      this.api.getAddressByUserId(this.userId).subscribe({
        next: (res: any) => {
          if (!res) {
            // If response is null or undefined, set address to null
            this.homeAddress = null;
          } else {
            // Filter addresses to include only 'home' and 'other'
            const filteredAddresses = res.filter((item: any) =>
              ['home', 'other'].includes(item.addressTypeName?.toLowerCase())
            );

            // If the filtered list is empty, set address to null
            this.homeAddress = filteredAddresses.length > 0 ? filteredAddresses : null;
          }

          console.log('User address:', this.homeAddress);
        },
        error: (error) => {
          console.error('API Error:', error);
          this.homeAddress = null; // Handle error by setting address to null
        }
      });



  }
   refreshAddressList(){
    this.ngOnInit();
   }
   onCloseAddProduct(){
    this.isAddProductVisible=false;
    }
   onAddAddress() {
    this.selectedAddress = undefined;
    this.isAddProductVisible= true;
  }

  goBack() {
    this.location.back();
  }
}
