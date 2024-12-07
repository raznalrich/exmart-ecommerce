import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedProductsComponent } from './highlighted-products.component';

describe('HighlightedProductsComponent', () => {
  let component: HighlightedProductsComponent;
  let fixture: ComponentFixture<HighlightedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
