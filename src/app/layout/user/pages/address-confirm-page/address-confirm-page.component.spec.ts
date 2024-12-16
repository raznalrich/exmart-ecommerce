import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressConfirmPageComponent } from './address-confirm-page.component';

describe('AddressConfirmPageComponent', () => {
  let component: AddressConfirmPageComponent;
  let fixture: ComponentFixture<AddressConfirmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressConfirmPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
