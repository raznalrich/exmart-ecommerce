import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopProductsChartComponent } from './admin-top-products-chart.component';

describe('AdminTopProductsChartComponent', () => {
  let component: AdminTopProductsChartComponent;
  let fixture: ComponentFixture<AdminTopProductsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTopProductsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
