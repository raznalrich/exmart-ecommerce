import { Component, Input } from '@angular/core';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { NewAddressComponent } from "../new-address/new-address.component";
import { ProfileAddressCardComponent } from '../../ui/profile-address-card/profile-address-card.component';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-select-address',
  standalone: true,
  imports: [AddAddressButtonComponent, NewAddressComponent, ProfileAddressCardComponent],
  templateUrl: './select-address.component.html',
  styleUrl: './select-address.component.scss'
})
export class SelectAddressComponent {
    constructor(public api:ApiServiceService){}
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
    ngOnInit() {
      this.address= this.api.getAddressByUserId(1).subscribe((res: any) => {
         this.address = res;

         console.log(this.address);
         // console.log("Name : ",this.arr[0].name);
     }
   )}

  onAddAddress() {
    // console.log('Add Address button clicked');
    // // Placeholder logic for adding a new address
    // this.addresses.push({
    //   label: 'NEW',
    //   name: 'John Doe',
    //   phone: '9876543210',
    //   address: '123 New Street, City, State, Country',
    // });
  }

  onEditAddress(data: any) {
    console.log('Edit Address:', data);
    // Placeholder logic for editing an address
  }

  onDeleteAddress(address: any) {
    // console.log('Delete Address:', address);
    // // Placeholder logic for deleting an address
    // this.address = this.address.filter(a => a !== address);
  }
}
