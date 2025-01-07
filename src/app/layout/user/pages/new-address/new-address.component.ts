import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../ui/text-input/text-input.component';
import { RadioGroupComponent } from '../../ui/radio-group/radio-group.component';
import { SelectInputComponent } from '../../ui/select-input/select-input.component';
import { SaveButtonComponent } from '../../ui/save-button/save-button.component';
import { CancelButtonComponent } from '../../ui/cancel-button/cancel-button.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { address } from '../../interfaces/AddressInterface';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TextInputComponent, RadioGroupComponent, SelectInputComponent, SaveButtonComponent, CancelButtonComponent],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
})

export class NewAddressComponent {
  @Input() editMode = false;
  @Input() addressData?: address;
  @Output() addressAdded = new EventEmitter<void>();
  @Output() addressUpdated = new EventEmitter<void>();
  @Output() submitError = new EventEmitter<string>();
  // @Output() cancelled = new EventEmitter<void>();

  addressForm: FormGroup;
  isSubmitting = false;
  apiErrors: { [key: string]: string[] } = {};
  errorMessage='';
  successMessage='';
  userId:number=0;

  constructor(private api: ApiServiceService, private fb: FormBuilder, public global:GlobalService) {
    this.global.getUserId();

    this.addressForm = this.fb.group({
      addressTypeName: ['Home', Validators.required],
      addressLine: ['', Validators.required], // Changed from buildingNo
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]] // Changed from pincode
    });
  }

ngOnInit() {
this.userId=this.global.userId();
  if (this.editMode && this.addressData) {
    this.addressForm.patchValue(this.addressData);
  }
}

get formControls() {
  return this.addressForm.controls; // Getter for form controls
}

// onSubmit(){
// if(this.addressForm.invalid){
// return;
// }
//   if (this.editMode) {
//     this.updateAddress(this.addressData?.id, this.addressForm.value);
//   } else {
// // Use the stored userId
//     this.api.addAddress(this.userId,this.addressForm.value).subscribe(
//       (response) => {
//         console.log('Address added successfully:', response);
//         this.successMessage = 'Address added successfully!';
//         this.addressAdded.emit();
//         this.resetForm();
//       },
//       (error) => {
//         console.error('Error adding address:', error);
//         this.errorMessage = 'Failed to add address.';
//         this.submitError.emit('Failed to add address');
//       }
//     );
//   }
// }

// private updateAddress(id: number | undefined, addressData: address): void {
//   if (id) {
//     const updateData = {
//       ...addressData,
//       userId: this.userId,
//       id: id
//     };
//     this.api.editAddressById(id, addressData).subscribe({
//       next: (response) => {
// console.log('Address updated successfully:', response);

//         this.successMessage = 'Address updated successfully';
//         this.addressUpdated.emit();
//         this.resetForm();
//       },
//       error: (error) => {
//         console.error('Error updating address:', error);
//         this.errorMessage = 'Failed to update address.';
//         this.submitError.emit('Failed to update address');
//       }
//     });
//   }
// }



private updateAddress(id: number | undefined, addressData: any): void {
  if (id) {
    const updateData = {
      ...addressData,
      userId: this.userId,
      id: id
    };

    this.api.editAddressById(id, updateData).subscribe({
      next: (response) => {
        console.log('Address updated successfully:', response);
        this.successMessage = 'Address updated successfully';
        this.addressUpdated.emit();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error updating address:', error);
        this.errorMessage = 'Failed to update address: ' + (error.message || 'Unknown error');
        this.submitError.emit('Failed to update address');
      }
    });
  }
}

onSubmit() {
  if (this.addressForm.invalid) {
    return;
  }

  if (this.editMode) {
    this.updateAddress(this.addressData?.id, this.addressForm.value);
  } else {
    const addressData = {
      ...this.addressForm.value,
      userId: this.userId
    };

    this.api.addAddress(this.userId, addressData).subscribe({
      next: (response) => {
        console.log('Address added successfully:', response);
        this.successMessage = 'Address added successfully!';
        this.addressAdded.emit();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding address:', error);
        this.errorMessage = 'Failed to add address: ' + (error.message || 'Unknown error');
        this.submitError.emit('Failed to add address');
      }
    });
  }
}

onCancel() {
  this.resetForm();
}

private resetForm(): void {
  this.addressForm.reset({
    addressTypeName: 'Home'
  });
  this.errorMessage = '';
  this.successMessage = '';
}

}





