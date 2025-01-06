import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoliciesTabsComponent } from './edit-policies-tabs.component';

describe('EditPoliciesTabsComponent', () => {
  let component: EditPoliciesTabsComponent;
  let fixture: ComponentFixture<EditPoliciesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPoliciesTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPoliciesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
