import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddtocartpageComponent } from './addtocartpage.component';

import { Router, ActivatedRoute } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../../../api.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { GlobalService } from '../../../../global.service';
import { EmailService } from '../../../../services/email.service';
import { LongButtonComponent } from '../../ui/long-button/long-button.component';
import { ProductDisplayingBarComponent } from '../../ui/product-displaying-bar/product-displaying-bar.component';

describe('AddtocartpageComponent', () => {
  let component: AddtocartpageComponent;
  let fixture: ComponentFixture<AddtocartpageComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let apiServiceService: jasmine.SpyObj<ApiServiceService>;
  let globalService: jasmine.SpyObj<GlobalService>;
  let emailService: jasmine.SpyObj<EmailService>;
  let router: jasmine.SpyObj<Router>;

  const mockCartItems = [
    { productId: 1, colorId: 'red', sizeId: 'M', quantity: 2 },
    { productId: 2, colorId: 'blue', sizeId: 'L', quantity: 1 }
  ];

  const mockProductDetails = [
    { id: 1, name: 'Product 1', price: 100, primaryImageUrl: 'url1' },
    { id: 2, name: 'Product 2', price: 200, primaryImageUrl: 'url2' }
  ];

  const mockColors = [
    { id: 1, name: 'Red' },
    { id: 2, name: 'Blue' }
  ];

  const mockSizes = [
    { id: 1, name: 'M' },
    { id: 2, name: 'L' }
  ];


  beforeEach(async () => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getProductsById',
      'getColorById',
      'getSizeById'
    ]);
    const apiServiceServiceSpy = jasmine.createSpyObj('ApiServiceService', [
      'getProductsById',
      'getAddressById',
      'placeOrder',
      'sendMail',
      'getColorById',
      'getSizeById'
    ]);
    const globalServiceSpy = jasmine.createSpyObj('GlobalService', [
      'getUserId',
      'userId',
      'cartCount',
      'selectedAddressId',
      'signalCartList'
    ], {
      signalOrderList: { set: jasmine.createSpy('set') }
    });

  const emailServiceSpy = jasmine.createSpyObj('EmailService', [
    'sendOrderConfirmationEmail',
    'sendOrderRequestEmail'
  ]);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        AddtocartpageComponent,
        LongButtonComponent,
        ProductDisplayingBarComponent,
        CurrencyPipe
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ApiServiceService, useValue: apiServiceServiceSpy },
        { provide: GlobalService, useValue: globalServiceSpy },
        { provide: EmailService, useValue: emailServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    apiServiceService = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
    globalService = TestBed.inject(GlobalService) as jasmine.SpyObj<GlobalService>;
    emailService = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    apiServiceSpy.getColorById.and.callFake((id: number) =>
      of(mockColors.find(color => color.id === id))
    );
    apiServiceSpy.getSizeById.and.callFake((id: number) =>
      of(mockSizes.find(size => size.id === id))
    );
    apiServiceServiceSpy.getColorById.and.callFake((id: number) =>
      of(mockColors.find(color => color.id === id))
    );
    apiServiceServiceSpy.getSizeById.and.callFake((id: number) =>
      of(mockSizes.find(size => size.id === id))
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtocartpageComponent);
    component = fixture.componentInstance;

    // Setup default spy returns
    globalService.userId.and.returnValue(1);
    globalService.cartCount.and.returnValue(2);
    globalService.selectedAddressId.and.returnValue('1');
    globalService.signalCartList.and.returnValue(mockCartItems);

    apiServiceService.getAddressById.and.returnValue(of('Test Address'));
    apiServiceService.getProductsById.and.returnValues(...mockProductDetails.map(product => of(product)));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cart message when cart count is 0', () => {
    globalService.cartCount.and.returnValue(0);
    fixture.detectChanges();

    const emptyCartMessage = fixture.nativeElement.querySelector('p.mb-4');
    expect(emptyCartMessage.textContent).toContain("Looks like you haven't added anything to your cart yet");
  });

  it('should load cart items and calculate total price', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.CartItems.length).toBe(2);
    expect(component.totalPrice).toBe(400); // (100 * 2) + (200 * 1)
  }));


  it('should redirect to home when continue shopping is clicked', () => {
    component.redirectToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle email sending', fakeAsync(() => {
    spyOn(window, 'alert');
    apiServiceService.sendMail.and.returnValue(of({ success: true }));

    component.onSendReplay('test@email.com', 'Test Subject');
    tick();

    expect(window.alert).toHaveBeenCalledWith('Email sent successfully');
  }));

  it('should handle API errors gracefully', fakeAsync(() => {
    spyOn(console, 'error');
    apiServiceService.getAddressById.and.returnValue(throwError(() => new Error('API Error')));

    component.loadAddress(1);
    tick();

    expect(console.error).toHaveBeenCalled();
  }));

  it('should show correct summary details', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const summarySection = fixture.nativeElement.querySelector('.summary-section');
    expect(summarySection).toBeTruthy();
    expect(summarySection.textContent).toContain('Summary');
  }));
});








// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AddtocartpageComponent } from './addtocartpage.component';

// describe('AddtocartpageComponent', () => {
//   let component: AddtocartpageComponent;
//   let fixture: ComponentFixture<AddtocartpageComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AddtocartpageComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddtocartpageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
