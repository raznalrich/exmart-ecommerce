import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedConfirmationEmailComponent } from './shipped-confirmation-email.component';

describe('ShippedConfirmationEmailComponent', () => {
  let component: ShippedConfirmationEmailComponent;
  let fixture: ComponentFixture<ShippedConfirmationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippedConfirmationEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippedConfirmationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
