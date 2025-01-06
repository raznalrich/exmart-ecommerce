import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-product-feedback',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-feedback.component.html',
  styleUrl: './product-feedback.component.scss'
})
export class ProductFeedbackComponent {
  constructor(private api:ApiService) { }
  @Input() productName=""

  productFeedbackForm = new FormGroup({
    feedback:new FormControl(''),
    userId:new FormControl('2'),
    productName:new FormControl('')
  });

  submitProductFeedback(){

    this.productFeedbackForm.value.productName=this.productName
    if (this.api && this.productFeedbackForm.valid) {
      console.log('Sending feedback:', this.productFeedbackForm.value);

      this.api.saveUserFeedback(this.productFeedbackForm.value).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
        },
      });
  }

}
}
