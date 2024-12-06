import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss'
})
export class NewAddressComponent {
  constructor(public api: ApiService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(10),
      Validators.maxLength(15),
    ]),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
    home: new FormControl(''),
    work: new FormControl(''),
  });

  onSubmit() {
      console.log(this.form.value);

  }
  ngOnInit() {
    this.form.get('pincode')?.valueChanges.subscribe((pincode) => {
      // console.log(pincode);

      if (pincode?.length === 6) {
        this.api.getPINData(pincode).subscribe((data) => {
          if (data && data.length > 0) {
            this.form.get('state')?.setValue(data[0].stateName);
            this.form.get('city')?.setValue(data[0].taluk);
          }
        });
      }
    });
  }

}
