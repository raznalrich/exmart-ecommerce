import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouPurchaseComponent } from './thank-you-purchase.component';

describe('ThankYouPurchaseComponent', () => {
  let component: ThankYouPurchaseComponent;
  let fixture: ComponentFixture<ThankYouPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
