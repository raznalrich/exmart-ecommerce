import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyContentComponent } from './policy-content.component';

describe('PolicyContentComponent', () => {
  let component: PolicyContentComponent;
  let fixture: ComponentFixture<PolicyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
