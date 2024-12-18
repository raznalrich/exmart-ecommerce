import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-carousel',
  standalone: true,
  imports: [],
  templateUrl: './single-carousel.component.html',
  styleUrl: './single-carousel.component.scss'
})
export class SingleCarouselComponent {

// @Input() carouselImages:any={
// id:0,
// imageSrc:'',
// altText:''
// }

@Input() carouselImages: { id: number; imageCollectionUrl: string }[] = [];
@Input() currentImageIndex: number = 0;
// carouselImages:any
}

