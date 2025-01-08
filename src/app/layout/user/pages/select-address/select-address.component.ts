import { GlobalService } from './../../../../global.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { NewAddressComponent } from "../new-address/new-address.component";
import { ProfileAddressCardComponent } from '../../ui/profile-address-card/profile-address-card.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { address } from '../../interfaces/AddressInterface';

@Component({
  selector: 'app-select-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddAddressButtonComponent, NewAddressComponent, ProfileAddressCardComponent],
  templateUrl: './select-address.component.html',
  styleUrl: './select-address.component.scss'
})
export class SelectAddressComponent {

address:address[]=[]
selectedAddress?:address;
isLoading=false
addressId:number=0;
userId:number=0;
    constructor(public api:ApiServiceService, private fb:FormBuilder, public global:GlobalService){
    this.global.getUserId()
  }

ngOnInit() {
this.userId=this.global.userId();
this.refreshAddressList()
}

refreshAddressList() {
  this.isLoading = true;
  this.api.getAddressByUserId(this.userId).subscribe((res: any) => {
        this.address = res.filter((item: any) =>
          ['home', 'other'].includes(item.addressTypeName.toLowerCase())
        );
      });
}

onAddAddress() {
  this.selectedAddress = undefined;
}

onEdit(id: number) {

this.addressId=id;
  this.api.getAddressById(id).subscribe({
    next: (address: any) => {
      this.selectedAddress = address; // Set the selected address

      // const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      // editModal.show();
    },
    error: (error) => {
      console.error('Error fetching address', error);
    }
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

}
