import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminValuesDisplayingButtonComponent } from './admin-values-displaying-button.component';

describe('AdminValuesDisplayingButtonComponent', () => {
  let component: AdminValuesDisplayingButtonComponent;
  let fixture: ComponentFixture<AdminValuesDisplayingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminValuesDisplayingButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminValuesDisplayingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
