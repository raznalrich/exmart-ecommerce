import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feedback-replay',
  standalone: true,
  imports: [],
  templateUrl: './feedback-replay.component.html',
  styleUrl: './feedback-replay.component.scss'
})
export class FeedbackReplayComponent {

  @ViewChild('staticBackdrop') modal: any;

  ngAfterViewInit() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
      });
    }
  }



}
