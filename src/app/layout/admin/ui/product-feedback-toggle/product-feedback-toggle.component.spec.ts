import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeedbackToggleComponent } from './product-feedback-toggle.component';

describe('ProductFeedbackToggleComponent', () => {
  let component: ProductFeedbackToggleComponent;
  let fixture: ComponentFixture<ProductFeedbackToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFeedbackToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFeedbackToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
