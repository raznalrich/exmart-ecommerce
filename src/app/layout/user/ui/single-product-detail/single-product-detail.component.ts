import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss'
})
export class SingleProductDetailComponent {
@Input() data: any;
id: any;
@Input() userId:any;
  private paramSubscription!: Subscription;
constructor(private route: ActivatedRoute,public api: ApiService, public cartService: GlobalService,public apis : ApiServiceService) {}
ngOnInit(){
console.log("details",this.data)
this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
  const idParam = paramMap.get('id');
  this.id = idParam ? Number(idParam) : null;
})
}
addtocart() {
  this.userId = 1; // Replace with dynamic userId if needed
  console.log('Adding to cart with ID:', this.id, 'User ID:', this.userId); // Debug log

  this.apis.addToCart(this.id, this.userId).subscribe(
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
