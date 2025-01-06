import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ApiService } from '../../../../api.service';
import {
  ReactiveFormsModule,
  FormControl,
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

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TextInputComponent, RadioGroupComponent, SelectInputComponent, SaveButtonComponent, CancelButtonComponent],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
})
export class NewAddressComponent {
@Input()editMode=false;
@Input()addressData?:address;
@Output()addressAdded=new EventEmitter<void>()
@Output()addressUpdated=new EventEmitter<void>()

addressForm: FormGroup;
isSubmitting=false;
  // selectedAddressId:number=0;
// @Output()addressAdded=new EventEmitter<void>();
  constructor(public api: ApiServiceService, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
    name: ['', Validators.required],
    addressTypeName: ['Home', Validators.required],
    buildingNo: ['', Validators.required],
    place: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    state: ['', Validators.required],
    // country: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });
}
  // states: { name: string; code: string }[] = [];


  // addressForm = new FormGroup({
  //   streetAddress: new FormControl(''),
  //   apartment: new FormControl(''),
  //   city: new FormControl(''),
  //   state: new FormControl(''),
  //   zipCode: new FormControl(''),
  //   country: new FormControl(''),
  //   isDefault: new FormControl(false),
  //   addressType: new FormControl('home') // home, work, other
  // });


  // ngOnInit() {
  //   this.form = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', Validators.required],
  //     address: ['', Validators.required],
  //     city: ['', Validators.required],
  //     state: ['', Validators.required],
  //     pincode: ['', Validators.required],
  //     type: ['home', Validators.required] // default value
  //   });
  // }

ngOnInit(){
if(this.editMode && this.addressData){
this.addressForm.patchValue(this.addressData);
}
}
  // onSubmit() {
  //   if (this.addressForm.valid) {
  //     this.api.addAddress(this.addressForm.value).subscribe({
  //       next: (response) => {
  //         console.log('Address added successfully', response);
  //         this.closeModal();
  //         this.resetForm();
  //         this.addressAdded.emit();
  //       },
  //       error: (error) => {
  //         console.error('Error adding address', error);
  //       }
  //     });
  //   }
  // }
    // private closeModal() {
    //   const modal = document.getElementById('exampleModal');
    //   // if (modal) {
    //   //   const modalInstance = bootstrap.Modal.getInstance(modal);
    //   //   modalInstance?.hide();
    //   // }
    // }

    // private resetForm() {
    //   this.addressForm.reset({ addressTypeName: 'Home' });
    // }

  // onCancel(event: Event): void {
  //   // handle cancel logic
  // }

  // onSave(event: Event): void {
  //   console.log('Save button clicked!', event);
  //   // Implement save functionality here
  // }

  onSubmit() {
    if (this.addressForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      if (this.editMode && this.addressData?.id) {
        this.updateAddress(this.addressData.id);
      } else {
        this.addAddress();
      }
    }
  }


// onSubmit(){
// if(this.addressForm && this.addressForm.valid)
//   console.log('Sending data:', this.addressForm.valid);
// this.api.addAddress(this.addressForm.value).subscribe({
//   next: (response) => {
//     console.log('Address added successfully:', response);
// this.addressForm.reset();
//   },
//   error: (error) => {
//     console.error('Error adding address:', error);
//   }
// });
// }

  addAddress() {
    this.api.addAddress(this.addressForm.value).subscribe({
      next: () => {
        this.handleSuccess('added');
        this.addressAdded.emit();
      },
      error: this.handleError.bind(this)
    });
  }

  private updateAddress(id: number) {
    this.api.editAddressById(id, this.addressForm.value).subscribe({
      next: () => {
        this.handleSuccess('updated');
        this.addressUpdated.emit();
      },
      error: this.handleError.bind(this)
    });
  }

  private handleSuccess(action: string) {
    console.log(`Address ${action} successfully`);
    // this.closeModal();
    this.resetForm();
    this.isSubmitting = false;
  }

  private handleError(error: any) {
    console.error('Error with address:', error);
    this.isSubmitting = false;
  }

  // private closeModal() {
  //   const modalId = this.editMode ? 'editModal' : 'exampleModal';
  //   const modal = document.getElementById(modalId);
  //   if (modal) {
  //     // const modalInstance = bootstrap.Modal.getInstance(modal);
  //     // if (modalInstance) {
  //     //   modalInstance.hide();
  //     // }
  //   }
  // }

  private resetForm() {
    this.addressForm.reset({
      addressTypeName: 'Home',
      // country: 'India'
    });
  }
}

