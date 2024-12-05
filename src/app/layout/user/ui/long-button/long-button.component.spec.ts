import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongButtonComponent } from './long-button.component';

describe('LongButtonComponent', () => {
  let component: LongButtonComponent;
  let fixture: ComponentFixture<LongButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
