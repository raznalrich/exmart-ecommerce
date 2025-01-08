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
    // @Output() add = new EventEmitter<Address>();
    // @Output() addressAdded = new EventEmitter<Address>();
  //  address:any={
  //     name:'',
  //     badgeName:'',
  //     place:'',
  //     buildingNo:'',
  //     pincode:'',
  //     city:'',
  //     district:'',
  //     state:'',
  //     phoneNo:''
  //     }

address:address[]=[]
selectedAddress?:address;
isLoading=false
// addressForm:FormGroup;
// selectedAddressId:number=0;
    constructor(public api:ApiServiceService, private fb:FormBuilder){
      // this.addressForm = this.fb.group({
      //   name: ['', Validators.required],
      //   addressTypeName: ['Home', Validators.required],
      //   buildingNo: ['', Validators.required],
      //   // place: ['', Validators.required],
      //   city: ['', Validators.required],
      //   district: ['', Validators.required],
      //   state: ['', Validators.required],
      //   // country: ['', Validators.required],
      //   pincode: ['', Validators.required],
      //   phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      // });
    }

ngOnInit() {
this.refreshAddressList()
}

refreshAddressList() {
  this.isLoading = true;
  this.api.getAddressByUserId(1).subscribe((res: any) => {
        this.address = res.filter((item: any) =>
          ['home', 'other'].includes(item.addressTypeName.toLowerCase())
        );
      });
}

onAddAddress() {
  this.selectedAddress = undefined;
}

onEdit(id: number) {
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

// onEdit(id: number) {
//   const addressToEdit = this.address.find(a => a.id === id);
//   if (addressToEdit) {
//     this.selectedAddress = addressToEdit;
//   }

  // this.api.editAddressById(id).subscribe({
  //   next: (address: any) => {
  //       this.selectedAddress = address; // Set the selected address
  //       // Optionally, you can open the edit modal here
  //       // This can be done by triggering the modal programmatically
  //       const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  //       editModal.show();
  //   },
  //   error: (error) => {
  //       console.error('Error fetching address', error);
  //   }
// });
// }

// refreshAddressList() {
//   this.api.getAddressByUserId(1).subscribe((res: any) => {
//     this.address = res.filter((item: any) =>
//       ['home', 'other'].includes(item.addressTypeName.toLowerCase())
//     );
//   });
// }


// onEdit(id: number, AddAddressDTO: any) {
//   this.api.editAddressById(id, AddAddressDTO).subscribe({
//     next: (response: any) => {
//       console.log('Address updated successfully', response);
//       // Refresh the address list
//       this.refreshAddressList();
//     },
//     error: (error) => {
//       console.error('Error updating address', error);
//       // Handle error appropriately
//     }
//   });
// }

// onEdit(id: number) {
//   this.selectedAddressId = id;
//   this.api.getAddressByUserId(id).subscribe({
//     next: (address: any) => {
//       this.addressForm.patchValue(address);
//     },
//     error: (error) => {
//       console.error('Error loading address', error);
//     }
//   });
// }

// onSubmit() {
//   if (this.addressForm.valid) {
//     if (this.selectedAddressId) {
//       // Edit existing address
//       this.api.editAddressById(this.selectedAddressId, this.addressForm.value).subscribe({
//         next: () => {
//           this.closeModal('editModal');
//           this.refreshAddressList();
//           this.resetForm();
//         }
//       });
//     // } else {
//     //   // Add new address
//     //   this.api.addAddress(this.addressForm.value).subscribe({
//     //     next: () => {
//     //       this.closeModal('exampleModal');
//     //       this.refreshAddressList();
//     //       this.resetForm();
//     //     }
//     //   });
//     }
//   }
// }


// private closeModal(modalId: string) {
//   const modal = document.getElementById(modalId);
//   // if (modal) {
//   //   const modalInstance = bootstrap.Modal.getInstance(modal);
//   //   modalInstance?.hide();
//   // }
// }

// private resetForm() {
//   this.addressForm.reset({ addressTypeName: 'Home' });
//   this.selectedAddressId = 0;
// }

// onAdd() {
//   // this.resetMessages();
//   this.add.emit();
// }

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
