import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Chart } from 'chart.js';
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a canvas element', () => {
    const canvasElement = fixture.debugElement.query(By.css('canvas#barChart'));
    expect(canvasElement).toBeTruthy();
  });
});
