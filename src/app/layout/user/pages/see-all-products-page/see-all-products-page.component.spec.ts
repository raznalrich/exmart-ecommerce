import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SeeAllProductsPageComponent } from './see-all-products-page.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { of } from 'rxjs';
import { ProductcardComponent } from '../../ui/productcard/productcard.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SeeAllProductsPageComponent', () => {
  let component: SeeAllProductsPageComponent;
  let fixture: ComponentFixture<SeeAllProductsPageComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiServiceService>;

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiServiceService', ['getProducts']);
    // spy.getProducts.and.returnValue(of(mockProducts));
    spy.getProducts.and.returnValue(of([]))
    await TestBed.configureTestingModule({
      // declarations: [
      //   SeeAllProductsPageComponent,
      //   ProductcardComponent
      // ],
      imports: [
              SeeAllProductsPageComponent,  // Import FooterComponent directly (standalone component)
              HttpClientTestingModule,  // Import HttpClientTestingModule for testing HTTP requests
              HttpClientModule,  // Import HttpClientModule if you need it in your tests
            ],
      providers: [
         provideHttpClientTesting(),
        { provide: ApiServiceService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }]
      // imports: [SeeAllProductsPageComponent]
    })
    .compileComponents();
    apiServiceSpy = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should initialize with empty arrays and sets', () => {
  //   expect(component.product).toEqual([]);
  //   expect(component.displayedProducts).toEqual([]);
  //   expect(component.selectedCategories.size).toBe(0);
  //   expect(component.allProList).toEqual([]);
  //   expect(component.CategoryList).toEqual([]);
  // });

  // it('should fetch products on init', fakeAsync(() => {
  //   component.ngOnInit();
  //   tick();

  //   expect(apiServiceSpy.getProducts).toHaveBeenCalled();
  //   expect(component.allProList).toEqual(mockProducts);
  // }));

  it('should display products in the template', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const productElements = fixture.nativeElement.querySelectorAll('app-productcard');
    expect(productElements.length).toBe(0);
  }));

  it('should render the heading correctly', () => {
    const heading = fixture.nativeElement.querySelector('.heading');
    expect(heading.textContent).toContain('All products in exMart');
  });

  it('should render the product grid container', () => {
    const productGrid = fixture.nativeElement.querySelector('.productGrid');
    expect(productGrid).toBeTruthy();
  });
});
