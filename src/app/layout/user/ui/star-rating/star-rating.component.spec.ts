import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';
import { By } from '@angular/platform-browser';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  const mockRating = {
    rate: 4.5,
    count: 123
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    component.rating = mockRating;
    fixture.detectChanges();
  });
  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values when no rating is provided', () => {
      const newComponent = TestBed.createComponent(StarRatingComponent).componentInstance;
      expect(newComponent.rating).toEqual({ rate: 0, count: 0 });
      expect(newComponent.ratingPercentage).toBe(0);
    });
  });

  describe('Rating Display', () => {
    it('should display correct rating value', () => {
      const rateElement = fixture.debugElement.query(By.css('.rate'));
      expect(rateElement.nativeElement.textContent.trim()).toBe('4.5');
    });

    it('should display correct number of reviews', () => {
      const reviewElement = fixture.debugElement.query(By.css('.review'));
      expect(reviewElement.nativeElement.textContent.trim()).toBe('123 reviews');
    });

    it('should have correct filled-stars width percentage', () => {
      const filledStarsElement = fixture.debugElement.query(By.css('.filled-stars'));
      expect(filledStarsElement.styles['width']).toBe('90%');
    });
  });

  describe('Star Rating Visual Elements', () => {
    it('should have rate-section container', () => {
      const rateSection = fixture.debugElement.query(By.css('.rate-section'));
      expect(rateSection).toBeTruthy();
    });

    it('should have star-rating container', () => {
      const starRating = fixture.debugElement.query(By.css('.star-rating'));
      expect(starRating).toBeTruthy();
    });

    it('should have filled-stars element', () => {
      const filledStars = fixture.debugElement.query(By.css('.filled-stars'));
      expect(filledStars).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero rating', () => {
      component.rating = { rate: 0, count: 0 };
      component.ratingPercentage = 0;
      fixture.detectChanges();

      const filledStarsElement = fixture.debugElement.query(By.css('.filled-stars'));
      const rateElement = fixture.debugElement.query(By.css('.rate'));
      const reviewElement = fixture.debugElement.query(By.css('.review'));

      expect(filledStarsElement.styles['width']).toBe('0%');
      expect(rateElement.nativeElement.textContent.trim()).toBe('0');
      expect(reviewElement.nativeElement.textContent.trim()).toBe('0 reviews');
    });

    it('should handle maximum rating', () => {
      component.rating = { rate: 5, count: 1000 };
      component.ratingPercentage = 100;
      fixture.detectChanges();

      const filledStarsElement = fixture.debugElement.query(By.css('.filled-stars'));
      const rateElement = fixture.debugElement.query(By.css('.rate'));

      expect(filledStarsElement.styles['width']).toBe('100%');
      expect(rateElement.nativeElement.textContent.trim()).toBe('5');
    });
  });

  describe('Rating Percentage Calculation', () => {
    it('should calculate correct percentage for different ratings', () => {
      const testCases = [
        { rate: 1, expected: 20 },
        { rate: 2.5, expected: 50 },
        { rate: 3.7, expected: 74 },
        { rate: 4.9, expected: 98 }
      ];

      testCases.forEach(test => {
        component.rating = { rate: test.rate, count: 100 };
        component.ratingPercentage = (test.rate / 5) * 100;
        fixture.detectChanges();

        const filledStarsElement = fixture.debugElement.query(By.css('.filled-stars'));
        expect(filledStarsElement.styles['width']).toBe(`${test.expected}%`);
      });
    });
  });
});
