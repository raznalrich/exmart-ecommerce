import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistTableComponent } from './orderlist-table.component';

describe('OrderlistTableComponent', () => {
  let component: OrderlistTableComponent;
  let fixture: ComponentFixture<OrderlistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderlistTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
