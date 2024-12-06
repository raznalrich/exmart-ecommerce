import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [SinglePageDropdownComponent,CommonModule],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
colors:any={
color:'',
code:''
};
  arr:any;
details:any
  constructor(public api: ApiService) {}
  ngOnInit() {
   this.details= this.api.getProductDetails().subscribe((res: any) => {
      this.details = res;
      // console.log(this.details);
      this.arr=this.details.product;
      console.log(this.arr);
      this.colors=this.arr.colors
      console.log("colors",this.arr.colors[0].code);
    });
}
}
