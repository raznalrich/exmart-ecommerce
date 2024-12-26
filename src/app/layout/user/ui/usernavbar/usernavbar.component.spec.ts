import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsernavbarComponent } from './usernavbar.component';
import { GlobalService } from '../../../../global.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Mock GlobalService
class MockGlobalService {
  cart() {
    return 5;
  }
}

describe('UsernavbarComponent', () => {
  let component: UsernavbarComponent;
  let fixture: ComponentFixture<UsernavbarComponent>;
  let mockService: MockGlobalService;

  beforeEach(async () => {
    mockService = new MockGlobalService();

    await TestBed.configureTestingModule({
      imports: [
        UsernavbarComponent,
        RouterTestingModule,
      ],
      providers: [{ provide: GlobalService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct cart count', () => {
    const badgeElement = fixture.debugElement.query(By.css('.custom-badge'));
    expect(badgeElement).toBeTruthy();
    expect(badgeElement.nativeElement.textContent.trim()).toBe('5');
  });

  it('should render the logo', () => {
    const logoElement = fixture.debugElement.query(
      By.css('img[alt="exMart-logo"]')
    );
    expect(logoElement).toBeTruthy();
    expect(logoElement.nativeElement.src).toContain('images/exMart-logo.png');
  });

  it('should have a working router link for the cart', () => {
    const cartIcon = fixture.debugElement.query(By.css('img[alt="cart"]'));
    expect(cartIcon).toBeTruthy();
    const routerLink = cartIcon.attributes['routerLink'];
    expect(routerLink).toBe('addcart');
  });
});