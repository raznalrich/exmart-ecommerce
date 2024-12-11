import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductDetailComponent } from './single-product-detail.component';

describe('SingleProductDetailComponent', () => {
  let component: SingleProductDetailComponent;
  let fixture: ComponentFixture<SingleProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
