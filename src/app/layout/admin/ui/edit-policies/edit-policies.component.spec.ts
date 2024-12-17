import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoliciesComponent } from './edit-policies.component';

describe('EditPoliciesComponent', () => {
  let component: EditPoliciesComponent;
  let fixture: ComponentFixture<EditPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPoliciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
