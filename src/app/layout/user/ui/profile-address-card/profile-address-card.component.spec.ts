import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressCardComponent } from './profile-address-card.component';

describe('ProfileAddressCardComponent', () => {
  let component: ProfileAddressCardComponent;
  let fixture: ComponentFixture<ProfileAddressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddressCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
