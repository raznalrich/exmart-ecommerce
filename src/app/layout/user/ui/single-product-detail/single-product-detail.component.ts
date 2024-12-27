import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [CommonModule,StarRatingComponent],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
@Input() data: any;
constructor(public api: ApiService, public cartService: GlobalService) {}
ngOnInit(){
    console.log("details",this.data)
}
}
