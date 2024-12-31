import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangepickerComponent } from './date-rangepicker.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DateRangepickerComponent', () => {
  let component: DateRangepickerComponent;
  let fixture: ComponentFixture<DateRangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangepickerComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.form.get('startDate')).toBeTruthy();
    expect(component.form.get('endDate')).toBeTruthy();
  });
});
