import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBadgeComponent } from './address-badge.component';

describe('AddressBadgeComponent', () => {
  let component: AddressBadgeComponent;
  let fixture: ComponentFixture<AddressBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
