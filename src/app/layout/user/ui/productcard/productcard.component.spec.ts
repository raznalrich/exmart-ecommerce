import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiServiceService } from '../../../../services/api-service.service';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ProductcardComponent } from './productcard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Add this import


describe('ProductcardComponent', () => {
  let component: ProductcardComponent;
  let fixture: ComponentFixture<ProductcardComponent>;
  let mockApiService: jasmine.SpyObj<ApiServiceService>;

  const mockProductData = {
    category: 'Electronics',
    colors: ['red', 'blue', 'white', 'black'],
    id: 1,
    imageUrl: 'test-image.jpg',
    productName: 'Test Product Name That Is Very Long',
    price: 1999.99,
    size: 'M',
    type: 'Test Type'
  };

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiServiceService', ['getMethod']);

    await TestBed.configureTestingModule({
      imports: [ProductcardComponent,RouterTestingModule,
        CommonModule,
        CurrencyPipe,  HttpClientTestingModule],
        providers: [
          { provide: ApiServiceService, useValue: mockApiService }  // Provide the mock service
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcardComponent);
    component = fixture.componentInstance;
    component.cards = mockProductData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Input Properties', () => {
    it('should have default empty values', () => {
      const newComponent = TestBed.createComponent(ProductcardComponent).componentInstance;
      expect(newComponent.cards).toEqual({
        category: '',
        colors: [],
        id: 0,
        imageUrl: '',
        name: '',
        price: 0,
        size: '',
        type: ''
      });
    });

    it('should accept input product data', () => {
      expect(component.cards).toEqual(mockProductData);
    });
  });

  describe('View Rendering', () => {
    it('should display category', () => {
      const categoryElement = fixture.debugElement.query(By.css('.category-head'));
      expect(categoryElement.nativeElement.textContent).toBe('Electronics');
    });

    it('should display product image with correct URL', () => {
      const imgElement = fixture.debugElement.query(By.css('.card-img-top'));
      expect(imgElement.attributes['src']).toBe('test-image.jpg');
      expect(imgElement.attributes['alt']).toBe('...');
    });

    it('should truncate product name to 22 characters', () => {
      const titleElement = fixture.debugElement.query(By.css('.card-title'));
      expect(titleElement.nativeElement.textContent).toBe('Test Product Name That');
    });

    it('should format price in INR currency', () => {
      const priceElement = fixture.debugElement.query(By.css('.card-text.para1'));
      expect(priceElement.nativeElement.textContent).toContain('₹1,999.99');
    });
  });

  describe('Color Circles', () => {
    it('should render correct number of color circles', () => {
      const colorCircles = fixture.debugElement.queryAll(By.css('.color-circle'));
      expect(colorCircles.length).toBe(mockProductData.colors.length);
    });

    it('should apply correct color classes', () => {
      const colorCircles = fixture.debugElement.queryAll(By.css('.color-circle'));

      expect(colorCircles[0].classes['red']).toBeTruthy();
      expect(colorCircles[1].classes['blue']).toBeTruthy();
      expect(colorCircles[2].classes['white']).toBeTruthy();
      expect(colorCircles[3].classes['black']).toBeTruthy();
    });

    it('should handle empty colors array', () => {
      component.cards.colors = [];
      fixture.detectChanges();

      const colorCircles = fixture.debugElement.queryAll(By.css('.color-circle'));
      expect(colorCircles.length).toBe(0);
    });
  });

  describe('View More Button', () => {

    it('should display "View more" text', () => {
      const button = fixture.debugElement.query(By.css('.btn-outline-primary'));
      expect(button.nativeElement.textContent).toBe('View more');
    });
  });

  describe('Card Structure', () => {
    it('should have correct card width', () => {
      const card = fixture.debugElement.query(By.css('.card'));
      expect(card.styles['width']).toBe('18rem');
    });

    it('should have all required sections', () => {
      expect(fixture.debugElement.query(By.css('.category-head'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.card-img-top'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.card-body'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.card-title'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.colourblock'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.card-text'))).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {


    it('should handle missing color values', () => {
      component.cards.colors = ['red', undefined, 'blue'];
      fixture.detectChanges();

      const colorCircles = fixture.debugElement.queryAll(By.css('.color-circle'));
      expect(colorCircles.length).toBe(3);
    });

    it('should handle zero price', () => {
      component.cards.price = 0;
      fixture.detectChanges();

      const priceElement = fixture.debugElement.query(By.css('.card-text.para1'));
      expect(priceElement.nativeElement.textContent).toContain('₹0.00');
    });
  });
});
