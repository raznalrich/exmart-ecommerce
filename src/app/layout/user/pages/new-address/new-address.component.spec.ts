import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddressComponent } from './new-address.component';

describe('NewAddressComponent', () => {
  let component: NewAddressComponent;
  let fixture: ComponentFixture<NewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
