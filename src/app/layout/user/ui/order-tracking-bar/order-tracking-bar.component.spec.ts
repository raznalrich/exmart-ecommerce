import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingBarComponent } from './order-tracking-bar.component';

describe('OrderTrackingBarComponent', () => {
  let component: OrderTrackingBarComponent;
  let fixture: ComponentFixture<OrderTrackingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTrackingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTrackingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
