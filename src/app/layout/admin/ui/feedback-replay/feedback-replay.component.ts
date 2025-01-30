import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-feedback-replay',
  standalone: true,
  imports: [ CommonModule,
    FormsModule],
  templateUrl: './feedback-replay.component.html',
  styleUrl: './feedback-replay.component.scss'
})
export class FeedbackReplayComponent {
  constructor(public api:ApiServiceService){}
  replayText: string = '';
  
  onSendReplay() {
    this.api.sendMail('raznalrich@gmail.com', 'Thank You For your feedback | Exmart', this.replayText)
    .subscribe({
      next: (response) => {
        console.log('Email sent successfully', response);
        this.replayText = '';
        alert("Email sent successfully")
      },
      error: (error) => {
        console.error('Error sending email:', error);
      }
    });

  }
}
