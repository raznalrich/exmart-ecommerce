import { Component } from '@angular/core';
import { LongButtonComponent } from '../long-button/long-button.component';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [LongButtonComponent],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {

}
