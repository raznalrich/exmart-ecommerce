import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoCartDeletebtnComponent } from './addto-cart-deletebtn.component';

describe('AddtoCartDeletebtnComponent', () => {
  let component: AddtoCartDeletebtnComponent;
  let fixture: ComponentFixture<AddtoCartDeletebtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtoCartDeletebtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtoCartDeletebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
