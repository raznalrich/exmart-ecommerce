import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmationanimationComponent } from './orderconfirmationanimation.component';

describe('OrderconfirmationanimationComponent', () => {
  let component: OrderconfirmationanimationComponent;
  let fixture: ComponentFixture<OrderconfirmationanimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderconfirmationanimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderconfirmationanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
