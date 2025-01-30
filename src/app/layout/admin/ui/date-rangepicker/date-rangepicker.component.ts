import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-rangepicker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './date-rangepicker.component.html',
  styleUrl: './date-rangepicker.component.scss',
})
export class DateRangepickerComponent {
  isOpen = false;
  dateRangeSelected = output<any>();

  form: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  applyFilter() {
    const { startDate, endDate } = this.form.value;
    this.dateRangeSelected.emit({ startDate, endDate });
    this.isOpen = false;
    console.log('filter applied');
  }

  resetFilter() {
    this.form.reset();
    this.dateRangeSelected.emit({ startDate: '', endDate: '' });
    console.log('reset applied');
  }
}