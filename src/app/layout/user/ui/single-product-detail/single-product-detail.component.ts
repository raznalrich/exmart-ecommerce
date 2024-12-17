import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [SinglePageDropdownComponent,CommonModule,StarRatingComponent],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
// colors:any;
  arr:any;
// details:any
@Input()details:any={
name:'',
description:'',
price:'',
rating:'',
color:'',
colors:[],
sixes:[],
images:[]
}
  constructor(public api: ApiService, public cartService: GlobalService) {}
  ngOnInit() {
   this.details= this.api.getProductDetails().subscribe((res: any) => {
      this.details = res;
      // console.log(this.details);
      this.arr=this.details.product;
      // console.log(this.arr);
      // this.colors=this.arr.colors
      // console.log("colors",this.arr.colors[0].code);
      console.log("colors",this.arr.colors)
    });
}
}
