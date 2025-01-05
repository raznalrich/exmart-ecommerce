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
    // ngOnInit() {
      // this.address= this.api.getAddressByUserId(1).subscribe((res: any) => {
      //    this.address = res;

      //    console.log(this.address);
         // console.log("Name : ",this.arr[0].name);
    //  }
  //  )}

// In your component file
ngOnInit() {
  this.api.getAddressByUserId(1).subscribe((res: any) => {
    this.address = res.filter((item: any) =>
      item.badgeName === 'Home' || item.badgeName === 'Other'
    );
    console.log(this.address);
  });

this.refreshAddressList()
}


onEdit(id: number, AddAddressDTO: any) {
  this.api.editAddressById(id, AddAddressDTO).subscribe({
    next: (response: any) => {
      console.log('Address updated successfully', response);
      // Refresh the address list
      this.refreshAddressList();
    },
    error: (error) => {
      console.error('Error updating address', error);
      // Handle error appropriately
    }
  });
}

refreshAddressList() {
  this.api.getAddressByUserId(1).subscribe((res: any) => {
    this.address = res.filter((item: any) =>
      ['home', 'other'].includes(item.addressTypeName.toLowerCase())
    );
  });
}

onDelete(id: number) {
  if (confirm('Are you sure you want to delete this address?')) {
    this.api.deleteAddressById(id).subscribe({
      next: () => {
        this.refreshAddressList();
      },
      error: (error) => {
        console.error('Error deleting address', error);
      }
    });
  }
}



  // ngOnInit() {
  //   this.api.getAddressByUserId(1).subscribe((res: any) => {
  //     this.address = res.filter((item: any) =>
  //       this.address.badgeName.toLowerCase() !== 'home'.toLowerCase()
  //     );
  //     console.log(this.address);
  //   });
  // }


  onAddAddress() {
    console.log('Add Address button clicked');
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
    console.log('Delete Address:', address);
    // // Placeholder logic for deleting an address
    // this.address = this.address.filter(a => a !== address);
  }
}
