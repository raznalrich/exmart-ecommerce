import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { FeedbackReplayComponent } from "../feedback-replay/feedback-replay.component";
import { ProductFeedbackToggleComponent } from "../product-feedback-toggle/product-feedback-toggle.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [FeedbackReplayComponent, ProductFeedbackToggleComponent,CommonModule],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent {

  feedback: any[] = [];
  filteredFeedback: any[] = [];
  currentFilter: string = 'all';

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    this.api.getUserFeedback().subscribe((res: any) => {
      this.feedback = res;
      this.filteredFeedback = [...res];
    });
  }

  onFilterChange(filter: string) {
    this.currentFilter = filter;

    if (filter === 'all') {
      this.filteredFeedback = [...this.feedback];
    } else if (filter === 'website') {
      this.filteredFeedback = this.feedback.filter(item =>
        item.productName.toLowerCase() === 'website'
      );
    } else if (filter === 'product') {
      this.filteredFeedback = this.feedback.filter(item =>
        item.productName.toLowerCase() !== 'website'
      );
    }
  }

  shouldShowProductColumn(): boolean {
    return this.currentFilter !== 'website';
  }

}



