import { Component } from '@angular/core';
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

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TextInputComponent, RadioGroupComponent, SelectInputComponent, SaveButtonComponent, CancelButtonComponent],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
})
export class NewAddressComponent {
  form!: FormGroup;

  constructor(public api: ApiService, private fb: FormBuilder) {}
  states: { name: string; code: string }[] = [];

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      type: ['home', Validators.required] // default value
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    }
  }

  onCancel(event: Event): void {
    // handle cancel logic
  }

  onSave(event: Event): void {
    console.log('Save button clicked!', event);
    // Implement save functionality here
  }


}
