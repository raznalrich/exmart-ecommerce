import { ComponentFixture, TestBed , fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  describe('Initialization', () => {
    it('should initialize with correct number of items', () => {
      expect(component.sliderItems.length).toBe(3);
      expect(component.thumbnails.length).toBe(3);
    });
    it('should properly map thumbnails from sliderItems', () => {
      expect(component.thumbnails[0].image).toBe(component.sliderItems[0].productImage);
      expect(component.thumbnails[0].title).toBe(component.sliderItems[0].title);
    });

    it('should call autoPlaySlider on init', () => {
      spyOn(component, 'autoPlaySlider');
      component.ngOnInit();
      expect(component.autoPlaySlider).toHaveBeenCalled();
    });
  });


  // //after implementing apis
  // describe('Slider Navigation', () => {
  //   it('should handle next slide correctly', fakeAsync(() => {
  //     const initialFirstItem = { ...component.sliderItems[0] };
  //     component.showSlider('next');
  //     tick(component.timeRunning);

  //     expect(component.sliderItems[component.sliderItems.length - 1]).toEqual(initialFirstItem);
  //     discardPeriodicTasks();
  //   }));

  //   it('should handle previous slide correctly', fakeAsync(() => {
  //     const initialLastItem = { ...component.sliderItems[component.sliderItems.length - 1] };
  //     component.showSlider('prev');
  //     tick(component.timeRunning);

  //     expect(component.sliderItems[0]).toEqual(initialLastItem);
  //     discardPeriodicTasks();
  //   }));

  //   it('should add and remove class names correctly', fakeAsync(() => {
  //     const carouselElement = component.carousel.nativeElement;
  //     component.showSlider('next');
  //     expect(carouselElement.classList.contains('next')).toBeTruthy();

  //     tick(component.timeRunning);
  //     expect(carouselElement.classList.contains('next')).toBeFalsy();
  //     discardPeriodicTasks();
  //   }));
  // });

});
