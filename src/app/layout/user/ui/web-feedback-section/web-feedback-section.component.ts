import { Component } from '@angular/core';
import { LongButtonComponent } from "../long-button/long-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-web-feedback-section',
  standalone: true,
  imports: [LongButtonComponent,ReactiveFormsModule],
  templateUrl: './web-feedback-section.component.html',
  styleUrl: './web-feedback-section.component.scss'
})
export class WebFeedbackSectionComponent {

  constructor(private api:ApiServiceService){}
  
  webfeedbackForm = new FormGroup({

    feedback: new FormControl('')
  });

  submitFeedback() {
    if (this.webfeedbackForm.valid) {
      console.log('Feedback submitted:', this.webfeedbackForm.value.feedback);
    } else {
      this.webfeedbackForm.markAllAsTouched();
    }
  }

}
