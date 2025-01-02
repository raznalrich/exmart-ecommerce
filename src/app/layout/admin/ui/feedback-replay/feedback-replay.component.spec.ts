import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReplayComponent } from './feedback-replay.component';

describe('FeedbackReplayComponent', () => {
  let component: FeedbackReplayComponent;
  let fixture: ComponentFixture<FeedbackReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackReplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
