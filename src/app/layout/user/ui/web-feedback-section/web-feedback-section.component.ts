import { Component } from '@angular/core';
import { LongButtonComponent } from "../long-button/long-button.component";

@Component({
  selector: 'app-web-feedback-section',
  standalone: true,
  imports: [LongButtonComponent],
  templateUrl: './web-feedback-section.component.html',
  styleUrl: './web-feedback-section.component.scss'
})
export class WebFeedbackSectionComponent {

  feedback: string = '';

  submitFeedback() {
    if (this.feedback) {
      console.log('Feedback submitted:', this.feedback);
      alert('Thank you for your feedback!');
      this.feedback = ''; // Reset the input
    } else {
      alert('Please enter your feedback!');
    }
  }

}
