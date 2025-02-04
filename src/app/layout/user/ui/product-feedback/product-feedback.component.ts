import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-feedback',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-feedback.component.html',
  styleUrl: './product-feedback.component.scss',
  animations: [
    trigger('buttonState', [
      state('idle', style({
        transform: 'scale(1)'
      })),
      state('submitting', style({
        transform: 'scale(0.95)'
      })),
      transition('idle <=> submitting', [
        animate('0.3s ease-in-out')
      ])
    ]),
  ]
})
export class ProductFeedbackComponent {
  constructor(private api:ApiService) { }
  wordCount = 0;
  maxWords = 100;
  showError = false;
  showSuccess = false;
  showWordLimitWarning = false;

  @Input() productName=""
isSubmitting=false;
getUserId() {
  const userId = localStorage.getItem('userId');
  return userId;
}
  productFeedbackForm = new FormGroup({
    feedback:new FormControl(''),
    userId:new FormControl(this.getUserId()),
    productName:new FormControl('')
  });

countWords(event: any) {
  const text = event.target.value;
  this.wordCount = text.trim().split(/\s+/).filter((word: string | any[]) => word.length > 0).length;

  if (this.wordCount > this.maxWords) {
    const words = text.trim().split(/\s+/).slice(0, this.maxWords);
    this.productFeedbackForm.get('feedback')?.setValue(words.join(' '));
    this.wordCount = this.maxWords;
    this.showWordLimitWarning = true;
    setTimeout(() => {
      this.showWordLimitWarning = false;
    }, 5000);
  }
}

submitProductFeedback() {
  if (!this.productFeedbackForm.get('feedback')?.value?.trim()) {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
    return;
  }
  this.productFeedbackForm.patchValue({ productName: this.productName });

  if (this.api && this.productFeedbackForm.valid) {
    this.isSubmitting = true;

    this.api.saveUserFeedback(this.productFeedbackForm.value).subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully:', response);
        this.showSuccess = true;
        this.productFeedbackForm.reset();
        this.productFeedbackForm.patchValue({ userId: this.getUserId() });
        this.wordCount = 0;
        setTimeout(() => {
          this.isSubmitting = false;
          this.showSuccess = false;
        }, 2000);
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
        this.isSubmitting = false;
      }
    });
  }}}
