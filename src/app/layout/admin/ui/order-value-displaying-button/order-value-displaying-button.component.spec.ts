import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderValueDisplayingButtonComponent } from './order-value-displaying-button.component';

describe('OrderValueDisplayingButtonComponent', () => {
  let component: OrderValueDisplayingButtonComponent;
  let fixture: ComponentFixture<OrderValueDisplayingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderValueDisplayingButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderValueDisplayingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
