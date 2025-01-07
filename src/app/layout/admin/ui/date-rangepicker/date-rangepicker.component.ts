import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-rangepicker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-rangepicker.component.html',
  styleUrl: './date-rangepicker.component.scss',
})
export class DateRangepickerComponent {
  dateRangeSelected = output<any>();

  form: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  applyFilter() {
    const { startDate, endDate } = this.form.value;
    this.dateRangeSelected.emit({ startDate, endDate });
    console.log('filter applied');
  }
  console(){
    console.log("button clicked");

  }

  resetFilter() {
    this.form.reset();
    this.dateRangeSelected.emit({ startDate: '', endDate: '' });
    console.log('reset applied');
  }
}
