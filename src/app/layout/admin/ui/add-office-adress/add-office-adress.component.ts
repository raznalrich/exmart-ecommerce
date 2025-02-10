import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../../../services/api-service.service';
import { GlobalService } from '../../../../global.service';
import { address } from '../../../user/interfaces/AddressInterface';

@Component({
  selector: 'app-add-office-adress',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-office-adress.component.html',
  styleUrl: './add-office-adress.component.scss',
})
export class AddOfficeAdressComponent {
  addressTypeName: string = 'Work';
  address:[] = [];
  addressTypeId: number = 2;
  userId:number =2;
  constructor(private api: ApiServiceService, public global: GlobalService) {}
  ngOnInit() {
    this.getOfficeAddressList()
    this.addressTypeId
    }
  officeAddress = new FormGroup({
    addressLine: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    district: new FormControl(''),
    createdBy: new FormControl(''),
    isPrimary: new FormControl(false),
    addressTypeId: new FormControl(2), // Office address type (Work)
    addressTypeName: new FormControl('Work'), //Work
  });

  validationMessages = {
    Address: [
      { type: 'required', message: 'Office Address is required' },
      { type: 'minlength', message: ' must be at least 4 characters long' },
    ],
    city: [{ type: 'required', message: 'City is required' }],
    state: [{ type: 'required', message: 'Please select a state' }],
    zipCode: [{ type: 'required', message: 'Please enter a valid zip code' }],
  };

  submitAddressForm() {
    if (this.officeAddress.valid) {
      console.log(
        'Office address added successfully',
        this.officeAddress.value
      );
      alert('Office address added successfully');

      this.api
        .addOfficeAddress(this.addressTypeId, this.officeAddress.value)
        .subscribe(
          (response) => {
            console.log('Office Address added successfully:', response);
          },
          (error) => {
            console.error('Error adding Office address:', error);
          }
        );
    } else {
      console.log('error occured');
    }
  }
addressList:any
  getOfficeAddressList() {
    this.api.getAddressByUserId(this.userId).subscribe((res: any) => {
      console.log("API Response:", res);
      this.addressList = res.filter((item: any) =>
        ['office'].includes(item.addressTypeName?.toLowerCase())
      );
      console.log("Filtered Address List:", this.addressList);
    });
  }


}
