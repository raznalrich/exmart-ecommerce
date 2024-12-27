import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationTickAnimationComponent } from './order-confirmation-tick-animation.component';

describe('OrderConfirmationTickAnimationComponent', () => {
  let component: OrderConfirmationTickAnimationComponent;
  let fixture: ComponentFixture<OrderConfirmationTickAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmationTickAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationTickAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
