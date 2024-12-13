import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWeeklyChartDispComponent } from './admin-weekly-chart-disp.component';

describe('AdminWeeklyChartDispComponent', () => {
  let component: AdminWeeklyChartDispComponent;
  let fixture: ComponentFixture<AdminWeeklyChartDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWeeklyChartDispComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWeeklyChartDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
