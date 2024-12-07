import { Component } from '@angular/core';
import { CategoryButtonComponent } from "../category-button/category-button.component";

@Component({
  selector: 'app-category-nav-bar',
  standalone: true,
  imports: [CategoryButtonComponent],
  templateUrl: './category-nav-bar.component.html',
  styleUrl: './category-nav-bar.component.scss'
})
export class CategoryNavBarComponent {

}
