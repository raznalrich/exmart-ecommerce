import { Component } from '@angular/core';
import { FeedbackListComponent } from '../../ui/feedback-list/feedback-list.component';

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [FeedbackListComponent],
  templateUrl: './view-feedback.component.html',
  styleUrl: './view-feedback.component.scss'
})
export class ViewFeedbackComponent {

}
