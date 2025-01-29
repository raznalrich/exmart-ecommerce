import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReplayButtonComponent } from './feedback-replay-button.component';

describe('FeedbackReplayButtonComponent', () => {
  let component: FeedbackReplayButtonComponent;
  let fixture: ComponentFixture<FeedbackReplayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackReplayButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackReplayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
