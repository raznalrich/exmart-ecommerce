import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllSoldProsListComponent } from './admin-all-sold-pros-list.component';

describe('AdminAllSoldProsListComponent', () => {
  let component: AdminAllSoldProsListComponent;
  let fixture: ComponentFixture<AdminAllSoldProsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllSoldProsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllSoldProsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
