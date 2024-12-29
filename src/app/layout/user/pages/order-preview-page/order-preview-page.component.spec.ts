import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPreviewPageComponent } from './order-preview-page.component';

describe('OrderPreviewPageComponent', () => {
  let component: OrderPreviewPageComponent;
  let fixture: ComponentFixture<OrderPreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPreviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
