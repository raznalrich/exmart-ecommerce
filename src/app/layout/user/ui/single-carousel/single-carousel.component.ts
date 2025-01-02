import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-carousel',
  standalone: true,
  imports: [],
  templateUrl: './single-carousel.component.html',
  styleUrl: './single-carousel.component.scss'
})
export class SingleCarouselComponent {
@Input() imgcollection: any[]=[];
newdata:any

ngOnInit(){
// console.log("carousel",this.data[0].imageCollectionUrl);
// this.newdata = this.data[0]
}
}
