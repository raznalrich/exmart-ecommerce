import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoCartLikebtnComponent } from './addto-cart-likebtn.component';

describe('AddtoCartLikebtnComponent', () => {
  let component: AddtoCartLikebtnComponent;
  let fixture: ComponentFixture<AddtoCartLikebtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtoCartLikebtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtoCartLikebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
