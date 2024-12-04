import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayingSectionComponent } from './product-displaying-section.component';

describe('ProductDisplayingSectionComponent', () => {
  let component: ProductDisplayingSectionComponent;
  let fixture: ComponentFixture<ProductDisplayingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDisplayingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplayingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
