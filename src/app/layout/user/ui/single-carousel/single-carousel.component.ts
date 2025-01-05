import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-carousel.component.html',
  styleUrl: './single-carousel.component.scss'
})
export class SingleCarouselComponent {
  @Input() imgcollection: any[] = [];
  // productImages:any[]=[]
  // constructor(public api: ApiServiceService, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.api.getImagesByProductId(3).subscribe((response: any) => {
  //     this.productImages = response;
  //     console.log('productImages', this.productImages);
  //   });
  // }


}
