import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-feedback-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-feedback-toggle.component.html',
  styleUrl: './product-feedback-toggle.component.scss'
})
export class ProductFeedbackToggleComponent {

  @Output() filterChange = new EventEmitter<string>();
  activeFilter: string = 'all';



  setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterChange.emit(filter);
  }
}
