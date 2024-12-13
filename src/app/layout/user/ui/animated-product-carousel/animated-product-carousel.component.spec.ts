import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedProductCarouselComponent } from './animated-product-carousel.component';

describe('AnimatedProductCarouselComponent', () => {
  let component: AnimatedProductCarouselComponent;
  let fixture: ComponentFixture<AnimatedProductCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedProductCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
