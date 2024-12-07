import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtocartpageComponent } from './addtocartpage.component';

describe('AddtocartpageComponent', () => {
  let component: AddtocartpageComponent;
  let fixture: ComponentFixture<AddtocartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtocartpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtocartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
