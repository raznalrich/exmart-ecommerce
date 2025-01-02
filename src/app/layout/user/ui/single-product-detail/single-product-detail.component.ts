import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ColorButtonComponent } from "../color-button/color-button.component";
import { SizeButtonComponent } from '../size-button/size-button.component';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [CommonModule, ColorButtonComponent, SizeButtonComponent],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
@Input() data: any;
id: any;
@Input() userId:any;
colorId:any
sizeId:any
qunatity:any
  private paramSubscription!: Subscription;
constructor(private route: ActivatedRoute,public api: ApiService, public cartService: GlobalService,public apis : ApiServiceService) {}

handleColorSelect(res: any) {
  console.log('Selected color:', res);
  this.colorId = res.id;
}

handleSizeSelect(res: any) {
  console.log('Selected size:', res);
  this.sizeId = res.id;
}

ngOnInit(){
// console.log("details",this.data)
this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
  const idParam = paramMap.get('id');
  this.id = idParam ? Number(idParam) : null;
})

}

addtocart() {
  this.userId = 1; // Replace with dynamic userId if needed
  console.log('Adding to cart with ID:', this.id, 'User ID:', this.userId); // Debug log

  this.apis.addToCart(this.id, this.userId,this.colorId,this.sizeId,this.qunatity).subscribe(
    (response) => {
      console.log('Item added to cart successfully:', response);
      this.cartService.getCartCount();
    },
    (error) => {
      console.error('Error adding item to cart:', error);
    }
  );
}


}
