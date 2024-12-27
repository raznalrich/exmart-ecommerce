import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-rangepicker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-rangepicker.component.html',
  styleUrl: './date-rangepicker.component.scss'
})
export class DateRangepickerComponent {

  form: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

}
