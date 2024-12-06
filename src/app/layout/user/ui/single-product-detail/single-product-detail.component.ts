import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
colors:any
  arr:any;
  @Input()details:any={
name:'',
code:''
    }
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.api.getProductDetails().subscribe((res: any) => {
      this.details = res;
console.log(this.details);

      this.arr=this.details.products;
      console.log(this.arr);
    });
}
}
