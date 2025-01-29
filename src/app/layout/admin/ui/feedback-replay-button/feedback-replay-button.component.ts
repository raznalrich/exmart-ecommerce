import { Component } from '@angular/core';
import { FeedbackReplayComponent } from "../feedback-replay/feedback-replay.component";

@Component({
  selector: 'app-feedback-replay-button',
  standalone: true,
  imports: [FeedbackReplayComponent],
  templateUrl: './feedback-replay-button.component.html',
  styleUrl: './feedback-replay-button.component.scss'
})
export class FeedbackReplayButtonComponent {

}
