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
  styleUrl: './new-address.component.scss',
})
export class NewAddressComponent {
  constructor(public api: ApiService) {}
  states: { name: string; code: string }[] = [];

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

 
}
