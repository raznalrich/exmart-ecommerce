import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInOrderComponent } from './items-in-order.component';

describe('ItemsInOrderComponent', () => {
  let component: ItemsInOrderComponent;
  let fixture: ComponentFixture<ItemsInOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsInOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
