import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayingBarComponent } from './product-displaying-bar.component';

describe('ProductDisplayingBarComponent', () => {
  let component: ProductDisplayingBarComponent;
  let fixture: ComponentFixture<ProductDisplayingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDisplayingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplayingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
