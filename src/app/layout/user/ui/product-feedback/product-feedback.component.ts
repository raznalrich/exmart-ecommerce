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


    // trigger('messageState', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateY(10px)' }),
    //     animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    //   ]),
    //   transition(':leave', [
    //     animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
    //   ])
    // ])
  ]
})
export class ProductFeedbackComponent {
  constructor(private api:ApiService) { }
//   @Input() productName=""

//   productFeedbackForm = new FormGroup({
//     feedback:new FormControl(''),
//     userId:new FormControl('2'),
//     productName:new FormControl('')
//   });

//   submitProductFeedback(){

//     this.productFeedbackForm.value.productName=this.productName
//     if (this.api && this.productFeedbackForm.valid) {
//       console.log('Sending feedback:', this.productFeedbackForm.value);

//       this.api.saveUserFeedback(this.productFeedbackForm.value).subscribe({
//         next: (response) => {
//           console.log('Feedback submitted successfully:', response);
//         },
//         error: (error) => {
//           console.error('Error submitting feedback:', error);
//         },
//       });
//   }
// }



  @Input() productName=""
isSubmitting=false;
// showThankYpu=false;
  productFeedbackForm = new FormGroup({
    feedback:new FormControl(''),
    userId:new FormControl('2'),
    productName:new FormControl('')
  });

//   submitProductFeedback(){

//     this.productFeedbackForm.value.productName=this.productName
//     if (this.api && this.productFeedbackForm.valid) {
//       console.log('Sending feedback:', this.productFeedbackForm.value);

//       this.api.saveUserFeedback(this.productFeedbackForm.value).subscribe({
//         next: (response) => {
//           console.log('Feedback submitted successfully:', response);
//         },
//         error: (error) => {
//           console.error('Error submitting feedback:', error);
//         },
//       });
//   }
// }

submitProductFeedback() {
  this.productFeedbackForm.patchValue({ productName: this.productName });

  if (this.api && this.productFeedbackForm.valid) {
    this.isSubmitting = true;

    this.api.saveUserFeedback(this.productFeedbackForm.value).subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully:', response);
        this.productFeedbackForm.reset();
        this.productFeedbackForm.patchValue({ userId: '2' });
        setTimeout(() => {
          this.isSubmitting = false;
        }, 1000);
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
        this.isSubmitting = false;
      }
    });
  }
}
  // resetForm() {
  //   this.showThankYpu = false;
  //   this.productFeedbackForm.reset();
  //   this.productFeedbackForm.patchValue({ userId: '2' });
  // }
}






