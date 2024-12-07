import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyNavBarComponent } from './policy-nav-bar.component';

describe('PolicyNavBarComponent', () => {
  let component: PolicyNavBarComponent;
  let fixture: ComponentFixture<PolicyNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
