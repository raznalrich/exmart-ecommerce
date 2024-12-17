import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangepickerComponent } from './date-rangepicker.component';

describe('DateRangepickerComponent', () => {
  let component: DateRangepickerComponent;
  let fixture: ComponentFixture<DateRangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
