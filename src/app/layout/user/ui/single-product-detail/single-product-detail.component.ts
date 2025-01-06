import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../single-page-dropdown/single-page-dropdown.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ColorButtonComponent } from '../color-button/color-button.component';
import { SizeButtonComponent } from '../size-button/size-button.component';
import { FormsModule } from '@angular/forms';
import { LongButtonComponent } from "../long-button/long-button.component";
import { WebFeedbackSectionComponent } from "../web-feedback-section/web-feedback-section.component";
import { ProductFeedbackComponent } from "../product-feedback/product-feedback.component";

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [CommonModule, ColorButtonComponent, SizeButtonComponent, FormsModule, WebFeedbackSectionComponent, ProductFeedbackComponent],
  templateUrl: './single-product-detail.component.html',
  styleUrl: './single-product-detail.component.scss',
})
export class SingleProductDetailComponent {
  @Input() data: any;
  id: any;
  @Input() userId: any;
  colorId: any;
  sizeId: any;
  quantity: number=1;
message:string='';
  private paramSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    public cartService: GlobalService,
    public apis: ApiServiceService
  ) {
    cartService.getUserId();
  }

  handleColorSelect(res: any) {
    console.log('Selected color:', res);
    this.colorId = res.id;
  }

  handleSizeSelect(res: any) {
    console.log('Selected size:', res);
    console.log('Quantity', this.quantity);
    this.sizeId = res.id;
  }

  onQuantityChange() {
    console.log('Updated Quantity:', this.quantity );
    // this.addtocart()
  }

  ngOnInit() {
    // console.log("details",this.data)
    this.paramSubscription = this.route.paramMap.subscribe((paramMap) => {
      const idParam = paramMap.get('id');
      this.id = idParam ? Number(idParam) : null;
    });
    this.userId = this.cartService.userId();
  }

  checkSelection() {
    if (!this.colorId || !this.sizeId) {
        this.message = 'Please select both size and color before adding to the cart.';
    } else {
        this.message = '';
    }
}

  addtocart() {
   // Replace with dynamic userId if needed
    console.log('Adding to cart with ID:', this.id, 'User ID:', this.userId); // Debug log

    // // Check if color and size are selected
    // if (!this.colorId && !this.sizeId) {
    //     alert('Please select both color and size before adding to the cart.'); // Alert message
    //     return; // Exit the method if selections are not made
    // } else if (!this.colorId) {
    //     alert('Please select a color before adding to the cart.'); // Alert message for missing color
    //     return; // Exit the method if color is not selected
    // } else if (!this.sizeId) {
    //     alert('Please select a size before adding to the cart.'); // Alert message for missing size
    //     return; // Exit the method if size is not selected
    // }

    this.apis
      .addToCart(this.id, this.userId, this.colorId, this.sizeId, this.quantity)
      .subscribe(
        (response) => {
          console.log('Item added to cart successfully:', response);
          this.cartService.getCartCount();
          alert('Product added to cart!'); // Alert message
        },
        (error) => {
          console.error('Error adding item to cart:', error);
        }
      );
  }
}
