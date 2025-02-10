import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeAdressComponent } from './add-office-adress.component';

describe('AddOfficeAdressComponent', () => {
  let component: AddOfficeAdressComponent;
  let fixture: ComponentFixture<AddOfficeAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfficeAdressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficeAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
