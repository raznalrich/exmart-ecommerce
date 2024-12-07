import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeedbackSectionComponent } from './web-feedback-section.component';

describe('WebFeedbackSectionComponent', () => {
  let component: WebFeedbackSectionComponent;
  let fixture: ComponentFixture<WebFeedbackSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeedbackSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebFeedbackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
