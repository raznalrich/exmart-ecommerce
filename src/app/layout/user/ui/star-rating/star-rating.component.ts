import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating: { rate: number; count: number } = { rate: 0, count: 0 };
  ratingPercentage: number = 0;

  ngOnInit(): void
  {
    this.ratingPercentage = (this.rating.rate / 5) * 100;
  }
}
