import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCarouselComponent } from './single-carousel.component';

describe('SingleCarouselComponent', () => {
  let component: SingleCarouselComponent;
  let fixture: ComponentFixture<SingleCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
