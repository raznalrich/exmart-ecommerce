import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let apiService: jasmine.SpyObj<ApiServiceService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  const mockCategories = [
    { id: 14, categoryName: 'Appliances' },
    { id: 20, categoryName: 'Garments' }
  ];

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiServiceService', ['getAllCategories']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    apiSpy.getAllCategories.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,  // Import FooterComponent directly (standalone component)
        HttpClientTestingModule,  // Import HttpClientTestingModule for testing HTTP requests
        HttpClientModule,  // Import HttpClientModule if you need it in your tests
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: ApiServiceService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }  // Mock ActivatedRoute
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;  // Inject the mock ActivatedRoute

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(apiService.getAllCategories).toHaveBeenCalled();
    expect(component.CategoryList).toEqual(mockCategories);
  });

  it('should display required footer content', () => {
    const footerElement = fixture.nativeElement;
    expect(footerElement.querySelector('img[src="images/exmart_logo.svg"]')).toBeTruthy();
    expect(footerElement.textContent).toContain('+91 99999 99999');
    expect(footerElement.textContent).toContain('experion.hr.experionglobal.com');
    expect(footerElement.textContent).toContain('Experion Global');
    expect(footerElement.textContent).toContain('© 2024 HR department Experion global');
  });

  it('should navigate to correct policy pages', () => {
        const policies = ['terms', 'shipping', 'payment'];

        policies.forEach(policy => {
          component.navigateToPolicy(policy);
          expect(router.navigate).toHaveBeenCalledWith(['/policies', policy]);
        });
      });

});


// import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { FooterComponent } from './footer.component';
// import { ApiServiceService } from '../../../../services/api-service.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;
//   let apiService: jasmine.SpyObj<ApiServiceService>;
//   let router: jasmine.SpyObj<Router>;
//   let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
//   const mockCategories = [
//     { id: 14, categoryName: 'Appliances' },
//     { id: 20, categoryName: 'Garments' }
//   ];
//   beforeEach(async () => {
//     const apiSpy = jasmine.createSpyObj('ApiServiceService', ['getAllCategories']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
//     apiSpy.getAllCategories.and.returnValue(of(mockCategories));
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, HttpClientModule],  // HttpClientTestingModule is necessary for API testing
//       declarations: [FooterComponent],  // Declare FooterComponent here
//       providers: [
//         provideHttpClientTesting(),  // Provide the HttpClientTesting backend
//         { provide: ApiServiceService, useValue: apiSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteSpy }  // Add this mock provider
//       ]
//     }).compileComponents();
//     apiService = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//     activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;  // Inject the mock ActivatedRoute
//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should load categories on init', () => {
//     expect(apiService.getAllCategories).toHaveBeenCalled();
//     expect(component.CategoryList).toEqual(mockCategories);
//   });
//   it('should display required footer content', () => {
//     const footerElement = fixture.nativeElement;
//     expect(footerElement.querySelector('img[src="images/exmart_logo.svg"]')).toBeTruthy();
//     expect(footerElement.textContent).toContain('+91 99999 99999');
//     expect(footerElement.textContent).toContain('experion.hr.experionglobal.com');
//     expect(footerElement.textContent).toContain('Experion Global');
//     expect(footerElement.textContent).toContain('© 2024 HR department Experion global');
//   });
//   // Additional tests
// });


// import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { FooterComponent } from './footer.component';
// import { ApiServiceService } from '../../../../services/api-service.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;
//   let apiService: jasmine.SpyObj<ApiServiceService>;
//   let router: jasmine.SpyObj<Router>;

//   const mockCategories = [
//     { id: 14, categoryName: 'Appliances' },
//     { id: 20, categoryName: 'Garments' }
//   ];

//   beforeEach(async () => {
//     const apiSpy = jasmine.createSpyObj('ApiServiceService', ['getAllCategories']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     apiSpy.getAllCategories.and.returnValue(of(mockCategories));

//     await TestBed.configureTestingModule({
//       imports: [FooterComponent,HttpClientModule],
//       declarations: [],
//       providers: [
//         provideHttpClientTesting(),
//         { provide: ApiServiceService, useValue: apiSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();

//     apiService = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should load categories on init', () => {
//     expect(apiService.getAllCategories).toHaveBeenCalled();
//     expect(component.CategoryList).toEqual(mockCategories);
//   });
//   it('should display all categories', () => {
//     const categoryElements = fixture.nativeElement.querySelectorAll('.cursoring');
//     expect(categoryElements.length).toBeGreaterThan(0);
//     mockCategories.forEach((category, index) => {
//       expect(categoryElements[index].textContent).toContain(category.categoryName);
//     });
//   });
//   it('should have working user account links', () => {
//     const addressLink = fixture.nativeElement.querySelector('[routerLink="userprofile/addresspage"]');
//     const orderHistoryLink = fixture.nativeElement.querySelector('[routerLink="userprofile/userorder"]');

//     expect(addressLink).toBeTruthy();
//     expect(orderHistoryLink).toBeTruthy();
//   });
//   it('should navigate to correct policy pages', () => {
//     const policies = ['terms', 'shipping', 'payment'];

//     policies.forEach(policy => {
//       component.navigateToPolicy(policy);
//       expect(router.navigate).toHaveBeenCalledWith(['/policies', policy]);
//     });
//   });
//   it('should open Teams chat with correct HR email', fakeAsync(() => {
//     const hrEmail = 'sona.george@experionglobal.com';
//     const originalLocation = window.location;
//     const mockLocation = { href: '' };
//     Object.defineProperty(window, 'location', {
//       value: mockLocation,
//       writable: true
//     });

//     component.openTeamsChat();
//     expect(mockLocation.href).toContain(encodeURIComponent(hrEmail));

//     tick(1000);
//     expect(mockLocation.href).toContain('teams.microsoft.com');
//     Object.defineProperty(window, 'location', {
//       value: originalLocation,
//       writable: true
//     });
//   }));
//   it('should display required footer content', () => {
//     const footerElement = fixture.nativeElement;

//     expect(footerElement.querySelector('img[src="images/exmart_logo.svg"]')).toBeTruthy();

//     expect(footerElement.textContent).toContain('+91 99999 99999');
//     expect(footerElement.textContent).toContain('experion.hr.experionglobal.com');
//     expect(footerElement.textContent).toContain('Experion Global');

//     expect(footerElement.textContent).toContain('© 2024 HR department Experion global');
//   });

//   it('should display all policy links', () => {
//     const policyTabs = fixture.nativeElement.querySelector('.policyTabs');

//     expect(policyTabs.textContent).toContain('Terms and conditions');
//     expect(policyTabs.textContent).toContain('Shipping policy');
//     expect(policyTabs.textContent).toContain('Payment policy');
//   });

//   it('should highlight active policy tab', () => {
//     Object.defineProperty(router, 'url', { value: '/policies/terms' });
//     fixture.detectChanges();

//     const termsTab = fixture.nativeElement.querySelector('.policyTabs div:first-child');
//     expect(termsTab.classList.contains('active')).toBeTrue();
//   });

//   it('should have working chat with HR button', () => {
//     const chatButton = fixture.nativeElement.querySelector('button');
//     expect(chatButton.textContent).toContain('Chat with HR');

//     spyOn(component, 'openTeamsChat');
//     chatButton.click();
//     expect(component.openTeamsChat).toHaveBeenCalled();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   // describe('Logo and Description', () => {
//   //   it('should display the company logo', () => {
//   //     const logo = fixture.debugElement.query(By.css('img[src="images/exmart_logo.svg"]'));
//   //     expect(logo).toBeTruthy();
//   //     expect(logo.attributes['alt']).toBeDefined();
//   //   });

//   //   it('should display the company description', () => {
//   //     const description = fixture.debugElement.query(By.css('.col p'));
//   //     expect(description.nativeElement.textContent).toContain('exMart is the online merchandise selling platform');
//   //   });
//   // });

//   // describe('Products Section', () => {
//   //   it('should display PRODUCTS heading', () => {
//   //     const heading = fixture.debugElement.queryAll(By.css('.col p strong'))[0];
//   //     expect(heading.nativeElement.textContent.trim()).toBe('PRODUCTS');
//   //   });

//   //   it('should list all product categories', () => {
//   //     const productSection = fixture.debugElement.queryAll(By.css('.col'))[1];
//   //     const categories = productSection.queryAll(By.css('li'));

//   //     expect(categories.length).toBe(3);
//   //     expect(categories[0].nativeElement.textContent).toContain('Appliances');
//   //     expect(categories[1].nativeElement.textContent).toContain('Stationary');
//   //     expect(categories[2].nativeElement.textContent).toContain('Garments');
//   //   });
//   // });

//   // describe('Your Account Section', () => {
//   //   it('should display YOUR ACCOUNT heading', () => {
//   //     const heading = fixture.debugElement.queryAll(By.css('.col p strong'))[1];
//   //     expect(heading.nativeElement.textContent.trim()).toBe('YOUR ACCOUNT');
//   //   });

//   //   it('should list all account options', () => {
//   //     const accountSection = fixture.debugElement.queryAll(By.css('.col'))[2];
//   //     const options = accountSection.queryAll(By.css('li'));

//   //     expect(options.length).toBe(2);
//   //     expect(options[0].nativeElement.textContent).toContain('Manage address');
//   //     expect(options[1].nativeElement.textContent).toContain('Order History');
//   //   });
//   // });

//   // describe('Contact Section', () => {
//   //   let contactColumn: any;

//   //   beforeEach(() => {
//   //     contactColumn = fixture.debugElement.queryAll(By.css('.col'))[3];
//   //   });

//   //   it('should display CONTACT heading', () => {
//   //     const heading = contactColumn.query(By.css('p strong'));
//   //     expect(heading.nativeElement.textContent.trim()).toBe('CONTACT');
//   //   });

//   //   it('should display phone number with icon', () => {
//   //     const phoneElement = contactColumn.query(By.css('li:first-child'));
//   //     const phoneIcon = phoneElement.query(By.css('.bi-telephone-fill'));

//   //     expect(phoneIcon).toBeTruthy();
//   //     expect(phoneElement.nativeElement.textContent).toContain('+91 99999 99999');
//   //   });

//   //   it('should display email with icon', () => {
//   //     const emailElement = contactColumn.queryAll(By.css('li'))[1];
//   //     const emailIcon = emailElement.query(By.css('.bi-envelope-fill'));

//   //     expect(emailIcon).toBeTruthy();
//   //     expect(emailElement.nativeElement.textContent.trim()).toContain('experion.hr.experionglobal.com');
//   //   });

//   //   it('should display address with icon', () => {
//   //     const addressElement = contactColumn.queryAll(By.css('li'))[2];
//   //     const addressIcon = addressElement.query(By.css('.bi-geo-alt-fill'));

//   //     expect(addressIcon).toBeTruthy();
//   //     expect(addressElement.nativeElement.textContent).toContain('Experion Global');
//   //     expect(addressElement.nativeElement.textContent).toContain('Technopark');
//   //   });

//   //   it('should have a chat button with icon', () => {
//   //     const chatButton = contactColumn.query(By.css('.btn-light'));
//   //     const sendIcon = chatButton.query(By.css('.bi-send-fill'));

//   //     expect(chatButton).toBeTruthy();
//   //     expect(chatButton.nativeElement.textContent).toContain('Chat with HR');
//   //     expect(sendIcon).toBeTruthy();
//   //   });
//   // });

//   // describe('Footer Bottom Section', () => {
//   //   it('should display policies text', () => {
//   //     const policiesText = fixture.debugElement.query(By.css('.row.text-center p strong'));
//   //     expect(policiesText.nativeElement.textContent).toContain('Terms and conditions');
//   //     expect(policiesText.nativeElement.textContent).toContain('Shipping policy');
//   //     expect(policiesText.nativeElement.textContent).toContain('Payment policy');
//   //   });

//   //   it('should display copyright notice', () => {
//   //     const copyright = fixture.debugElement.queryAll(By.css('.row.text-center p'))[1];
//   //     expect(copyright.nativeElement.textContent).toContain('© 2024 HR department Experion global');
//   //   });

//   //   it('should have a horizontal rule', () => {
//   //     const hr = fixture.debugElement.query(By.css('hr'));
//   //     expect(hr).toBeTruthy();
//   //   });
//   // });

//   // describe('Layout Structure', () => {
//   //   it('should have correct number of columns', () => {
//   //     const columns = fixture.debugElement.queryAll(By.css('.col'));
//   //     expect(columns.length).toBe(4);
//   //   });

//   //   it('should have two rows', () => {
//   //     const rows = fixture.debugElement.queryAll(By.css('.row'));
//   //     expect(rows.length).toBe(2);
//   //   });

//   //   it('should have bootstrap classes applied', () => {
//   //     const container = fixture.debugElement.query(By.css('.container1'));
//   //     expect(container).toBeTruthy();

//   //     const button = fixture.debugElement.query(By.css('.btn.btn-light'));
//   //     expect(button).toBeTruthy();
//   //   });
//   // });
// });
