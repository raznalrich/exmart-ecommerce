import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-carousel',
  standalone: true,
  imports: [],
  templateUrl: './single-carousel.component.html',
  styleUrl: './single-carousel.component.scss'
})
export class SingleCarouselComponent {
@Input() data: any;

ngOnInit(){
console.log("carousel",this.data.imageCollectionUrl);
}
}
