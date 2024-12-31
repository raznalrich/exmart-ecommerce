import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllProductsPageComponent } from './see-all-products-page.component';

describe('SeeAllProductsPageComponent', () => {
  let component: SeeAllProductsPageComponent;
  let fixture: ComponentFixture<SeeAllProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAllProductsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
