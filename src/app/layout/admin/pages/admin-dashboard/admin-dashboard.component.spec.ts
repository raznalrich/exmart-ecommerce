import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [AdminDashboardComponent],
      imports: [AdminDashboardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a greeting with "Welcome Admin"', () => {
    const greetingElement = fixture.debugElement.query(By.css('.greetings')).nativeElement;
    expect(greetingElement.textContent).toContain('Welcome Admin');
  });

  it('should display two admin value displaying buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-admin-values-displaying-button'));
    expect(buttons.length).toBe(2);
  });

  it('should display correct labels for admin value displaying buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-admin-values-displaying-button'));

    // Check the `label` input for each button
    const firstButtonInstance = buttons[0].componentInstance;
    const secondButtonInstance = buttons[1].componentInstance;

    expect(firstButtonInstance.label).toBe('Pending Orders');
    expect(secondButtonInstance.label).toBe('This month');
  });


  it('should display the weekly chart', () => {
    const weeklyChart = fixture.debugElement.query(By.css('app-admin-weekly-chart-disp'));
    expect(weeklyChart).toBeTruthy();
  });

  it('should display new orders section with an image', () => {
    const newOrdersImage = fixture.debugElement.query(By.css('.rightTopLeft img')).nativeElement;
    expect(newOrdersImage).toBeTruthy();
    expect(newOrdersImage.getAttribute('src')).toBe('icons/clockVoilet.png');
  });

  it('should have a "more" button in the right-top section', () => {
    const moreButton = fixture.debugElement.query(By.css('.morebut')).nativeElement;
    expect(moreButton.textContent).toBe('more');
  });

  it('should display recent orders component', () => {
    const recentOrdersComponent = fixture.debugElement.query(By.css('app-admin-recent-orders-in-dash-board'));
    expect(recentOrdersComponent).toBeTruthy();
  });
});
