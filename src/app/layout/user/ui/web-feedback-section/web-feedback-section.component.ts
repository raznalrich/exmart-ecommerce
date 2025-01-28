import { Component } from '@angular/core';
import { LongButtonComponent } from "../long-button/long-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-web-feedback-section',
  standalone: true,
  imports: [LongButtonComponent,ReactiveFormsModule,],
  templateUrl: './web-feedback-section.component.html',
  styleUrl: './web-feedback-section.component.scss'
})
export class WebFeedbackSectionComponent {

  constructor(private api:ApiService){}

  userid = localStorage.getItem('userid');

  webfeedbackForm = new FormGroup({

    feedback: new FormControl(''),
    userId: new FormControl(6),
    productName: new FormControl('website')

  });

  submitFeedback() {
    if (this.api && this.webfeedbackForm.valid) {
      console.log('Sending feedback:', this.webfeedbackForm.value);

      this.api.saveUserFeedback(this.webfeedbackForm.value).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
        },
      });
    } else {
      this.webfeedbackForm.markAllAsTouched();
      console.warn('Feedback form is invalid');
    }
  }
}
