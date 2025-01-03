import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllProductsPageComponent } from './see-all-products-page.component';
import { By } from '@angular/platform-browser';
import { ProductcardComponent } from '../../ui/productcard/productcard.component';
import { ApiService } from '../../../../api.service';
import { of } from 'rxjs';
import { ApiServiceService } from '../../../../services/api-service.service';

describe('SeeAllProductsPageComponent', () => {
  let component: SeeAllProductsPageComponent;
  let fixture: ComponentFixture<SeeAllProductsPageComponent>;
  let mockApiService: any;

  beforeEach(async () => {
    mockApiService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([
        {
          id: 1,
          brand: 'Brand A',
          primaryImageUrl: 'image-a.jpg',
          name: 'Product A',
          color: ['red', 'blue'],
          price: 1000,
        },
        {
          id: 2,
          brand: 'Brand B',
          primaryImageUrl: 'image-b.jpg',
          name: 'Product B',
          color: ['white', 'black'],
          price: 2000,
        },
      ])),
    };

    await TestBed.configureTestingModule({
      imports: [SeeAllProductsPageComponent,ProductcardComponent,ApiServiceService],
      providers: [{ provide: ApiService, useValue: mockApiService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all products on initialization', () => {
    expect(mockApiService.getProducts).toHaveBeenCalled();
    expect(component.allProList.length).toBe(2);
    expect(component.displayedProducts.length).toBe(2);
  });

  it('should display the correct number of product cards', () => {
    const productCards = fixture.debugElement.queryAll(By.css('app-productcard'));
    expect(productCards.length).toBe(2);
  });

  it('should pass the correct data to each product card', () => {
    const productCards = fixture.debugElement.queryAll(By.css('app-productcard'));
    expect(productCards[0].componentInstance.cards).toEqual({
      id: 1,
      brand: 'Brand A',
      primaryImageUrl: 'image-a.jpg',
      name: 'Product A',
      color: ['red', 'blue'],
      price: 1000,
    });
    expect(productCards[1].componentInstance.cards).toEqual({
      id: 2,
      brand: 'Brand B',
      primaryImageUrl: 'image-b.jpg',
      name: 'Product B',
      color: ['white', 'black'],
      price: 2000,
    });
  });
});
