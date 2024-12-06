import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyButtonsComponent } from './policy-buttons.component';

describe('PolicyButtonsComponent', () => {
  let component: PolicyButtonsComponent;
  let fixture: ComponentFixture<PolicyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
