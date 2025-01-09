import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AdminRecentOrdersInDashBoardComponent } from './admin-recent-orders-in-dash-board.component';

describe('AdminRecentOrdersInDashBoardComponent', () => {
  let component: AdminRecentOrdersInDashBoardComponent;
  let fixture: ComponentFixture<AdminRecentOrdersInDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecentOrdersInDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecentOrdersInDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();   
  });

  it('should display the correct number of products', () => {
    const productItems = fixture.debugElement.queryAll(By.css('.product-item'));
    expect(productItems.length).toBe(component.products.length);
  });

  it('should display the correct product index', () => {
    const productIndexes = fixture.debugElement.queryAll(By.css('.product-index'));
    productIndexes.forEach((indexElement, i) => {
      expect(indexElement.nativeElement.textContent.trim()).toBe((i + 1).toString());
    });
  });

  it('should display the correct product details', () => {
    const productNames = fixture.debugElement.queryAll(By.css('.product-name'));
    const productPrices = fixture.debugElement.queryAll(By.css('.product-price'));

    productNames.forEach((nameElement, i) => {
      expect(nameElement.nativeElement.textContent.trim()).toBe(component.products[i].name);
    });

    productPrices.forEach((priceElement, i) => {
      expect(priceElement.nativeElement.textContent.trim()).toBe(`₹ ${component.products[i].price}`);
    });
  });

  it('should display the correct product images', () => {
    const productImages = fixture.debugElement.queryAll(By.css('.product-image img'));

    productImages.forEach((imgElement, i) => {
      expect(imgElement.nativeElement.src).toContain(component.products[i].image);
    });
  });
});
