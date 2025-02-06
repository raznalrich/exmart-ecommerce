import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ScrollServiceService } from '../../../../services/scroll-service.service';
import { AnimationStateService } from '../../../../services/animation-state.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let apiService: jasmine.SpyObj<ApiServiceService>;
  let router: jasmine.SpyObj<Router>;
  let scrollService: jasmine.SpyObj<ScrollServiceService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiServiceService', ['getAllCategories', 'GetHrDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const scrollSpy = jasmine.createSpyObj('ScrollServiceService', ['triggerScroll']);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ApiServiceService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ScrollServiceService, useValue: scrollSpy },
        { provide: AnimationStateService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService) as jasmine.SpyObj<ApiServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    scrollService = TestBed.inject(ScrollServiceService) as jasmine.SpyObj<ScrollServiceService>;

     apiService.getAllCategories.and.returnValue(of([
    { id: 43, categoryName: 'Appliances' },
    { id: 47, categoryName: 'Electronics' },
  ]));

  apiService.GetHrDetails.and.returnValue(of({
    id: 1,
    hrPhoneNumber: 9999999111,
    hrEmail: 'hr@experionglobal.com',
    hrChatEmail: 'sona.george@experionglobal.com',
    hrAddress: 'HR, Experion Global, Gayathiri Building, Technopark phase-1, Trivandrum - 695581',
    proTagLine: 'exMart is the e-branding website of experion global which holds all the experion branded items for sale'
  }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch category list on init', () => {
    const mockCategories = [
      { id: 43, categoryName: 'Appliances',iconPath: 'https://cdn-icons-png.flaticon.com/512/3724/3724720.png'},
      { id: 47, categoryName: 'Electronics',iconPath: 'https://cdn-icons-png.flaticon.com/512/3724/3724722.png' },
    ];
    apiService.getAllCategories.and.returnValue(of(mockCategories));

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.CategoryList).toEqual(mockCategories);
  });
  it('should fetch HR details on init', () => {
    const mockHrDetails = {
      id: 1,
      hrPhoneNumber: 9999999111,
      hrEmail: 'hr@experionglobal.com',
      hrChatEmail: 'sona.george@experionglobal.com',
      hrAddress: 'HR, Experion Global, Gayathiri Building, Technopark phase-1, Trivandrum - 695581',
      proTagLine: 'exMart is the e-branding website of experion global which holds all the experion branded items for sale'
    };
    apiService.GetHrDetails.and.returnValue(of(mockHrDetails));

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.HrDetailList).toEqual(mockHrDetails);
    expect(component.hrEmail).toEqual('sona.george@experionglobal.com');
  });
  it('should navigate to category on click', fakeAsync(() => {
    router.navigate.and.returnValue(Promise.resolve(true));
    component.navigateToCategory('47', 'Electronics');
    tick();
    tick(100);
    expect(router.navigate).toHaveBeenCalledWith(['/home/category/', '47']);
    expect(scrollService.triggerScroll).toHaveBeenCalledWith('47');
  }));
  it('should open Teams chat', fakeAsync(() => {
  spyOn(window, 'open');
  component.HrDetailList = {
    hrChatEmail: 'sona.george@experionglobal.com'
  };
  component.hrEmail = 'sona.george@experionglobal.com';
  component.openTeamsChat();
  expect(window.open).toHaveBeenCalledWith(
    'msteams:/l/chat/0/0?users=sona.george%40experionglobal.com',
    '_blank'
  );
  tick(1000);
  expect(window.open).toHaveBeenCalledWith(
    'https://teams.microsoft.com/_#/conversations/new?users=sona.george%40experionglobal.com',
    '_blank' );
}));

  it('should navigate to user page', () => {
    router.navigate.and.returnValue(Promise.resolve(true));
    component.navigateToUserSide('addresspage');
    expect(router.navigate).toHaveBeenCalledWith(['addresspage']);
  });
  it('should navigate to policy page', () => {
    router.navigate.and.returnValue(Promise.resolve(true));
    component.navigateToPolicy('terms');
    expect(router.navigate).toHaveBeenCalledWith(['/policies', 'terms']);
  });
});


