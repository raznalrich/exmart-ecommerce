import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [],
  templateUrl: './category-button.component.html',
  styleUrl: './category-button.component.scss'
})
export class CategoryButtonComponent {

  @Input() iconSrc: string = ''; // Path to the icon image
  @Input() label: string = 'Button'; // Label text

}
