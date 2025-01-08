import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

export class NewAddressComponent implements OnInit{
  @Input() editMode:boolean = true;
  @Input() addressData?: address;
  @Output() addressAdded = new EventEmitter<void>();
  @Output() addressUpdated = new EventEmitter<void>();
  @Output() submitError = new EventEmitter<string>();
  @Output() modalClose = new EventEmitter<void>();

  addressForm: FormGroup;
  isSubmitting = false;
  apiErrors: { [key: string]: string[] } = {};
  errorMessage='';
  successMessage='';
  userId:number=0;
  @Input() addressId:number=0;

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
// if (this.editMode && this.addressData) {
//   this.addressForm.patchValue(this.addressData);
//   this.fetchAddressById(this.addressId);
if (this.editMode && this.addressId !== undefined) {
  // this.fetchAddressById(this.addressId);
}
}

private fetchAddressById(id: number) {
  this.api.getAddressById(id).subscribe({
    next: (addressData:any) => {
      this.addressForm.patchValue(addressData);
    },
    error: (error) => {
      console.error('Error fetching address:', error);
      this.errorMessage = 'Failed to fetch address data.';
    },
  });
}

get formControls() {
  return this.addressForm.controls;
}

onSubmit(){
if(this.addressForm.invalid){
return;
}
  if (this.editMode) {
console.log('updating data');

    this.updateAddress(this.addressId, this.addressForm.value);
  } else
   {
    this.api.addAddress(this.userId,this.addressForm.value).subscribe(
      (response) => {
        console.log('Address added successfully:', response);
        this.successMessage = 'Address added successfully!';
        this.addressAdded.emit();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding address:', error);
        this.errorMessage = 'Failed to add address.';
        this.submitError.emit('Failed to add address');
      }
    );
  }
}

private updateAddress(id: number | undefined, addressData: address): void {
console.log('update address');
console.log('id',id);
console.log('addressdata',addressData);


  if (id) {
    const updateData = {
      ...addressData,
      userId: this.userId,
      id: id
    };
console.log('Update data being sent:', addressData);

    this.api.editAddressById(id, updateData).subscribe({
      next: (response) => {
        console.log('Address updated successfully:', response);
        this.successMessage = 'Address updated successfully';
        this.addressUpdated.emit();
        this.closeModal();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error updating address:', error);
        this.errorMessage = 'Failed to update address.';
        this.submitError.emit('Failed to update address');
      }
    });
  }
}

private closeModal(): void {
  setTimeout(() => {
    this.modalClose.emit();
  }, 1000); // Delay of 1 second to show success message before closing
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

