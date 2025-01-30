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
  wordCount = 0;
  maxWords = 100;
  showError = false;
  showSuccess = false;
  showWordLimitWarning = false;

  constructor(private api:ApiService){}
  getUserId() {
    const userId = localStorage.getItem('userId');
    return userId;
  }
  userid = localStorage.getItem('userid');

  webfeedbackForm = new FormGroup({

    feedback: new FormControl('',[Validators.required]),
    userId: new FormControl(this.getUserId()),
    productName: new FormControl('website')

  });

  countWords(event: any) {
    const text = event.target.value;
    this.wordCount = text.trim().split(/\s+/).filter((word: string | any[]) => word.length > 0).length;

    if (this.wordCount > this.maxWords) {
      const words = text.trim().split(/\s+/).slice(0, this.maxWords);
      this.webfeedbackForm.get('feedback')?.setValue(words.join(' '));
      this.wordCount = this.maxWords;
      this.showWordLimitWarning = true;
      setTimeout(() => {
        this.showWordLimitWarning = false;
      }, 5000);
    }
  }

  submitFeedback() {
    if (!this.webfeedbackForm.get('feedback')?.value?.trim()) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
      return;
    }

    if (this.api && this.webfeedbackForm.valid) {
      this.api.saveUserFeedback(this.webfeedbackForm.value).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
          this.showSuccess = true;
          this.webfeedbackForm.reset({
            userId: this.getUserId(),
            productName: 'website'
          });
          this.wordCount = 0;
          setTimeout(() => {
            this.showSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
        }
      })}}
}

  // submitFeedback() {
  //   if (this.api && this.webfeedbackForm.valid) {
  //     console.log('Sending feedback:', this.webfeedbackForm.value);

  //     this.api.saveUserFeedback(this.webfeedbackForm.value).subscribe({
  //       next: (response) => {
  //         console.log('Feedback submitted successfully:', response);
  //       },
  //       error: (error) => {
  //         console.error('Error submitting feedback:', error);
  //       },
  //     });
  //   } else {
  //     this.webfeedbackForm.markAllAsTouched();
  //     console.warn('Feedback form is invalid');
  //   }
  // }
