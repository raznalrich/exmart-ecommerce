import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmedEmailComponent } from './order-confirmed-email.component';

describe('OrderConfirmedEmailComponent', () => {
  let component: OrderConfirmedEmailComponent;
  let fixture: ComponentFixture<OrderConfirmedEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmedEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
