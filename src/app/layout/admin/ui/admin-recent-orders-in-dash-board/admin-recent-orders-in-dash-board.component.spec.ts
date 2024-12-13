import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentOrdersInDashBoardComponent } from './admin-recent-orders-in-dash-board.component';

describe('AdminRecentOrdersInDashBoardComponent', () => {
  let component: AdminRecentOrdersInDashBoardComponent;
  let fixture: ComponentFixture<AdminRecentOrdersInDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecentOrdersInDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecentOrdersInDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
