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
import { QuantityComponent } from '../quantity/quantity.component';

@Component({
  selector: 'app-single-product-detail',
  standalone: true,
  imports: [CommonModule, ColorButtonComponent, SizeButtonComponent, FormsModule, WebFeedbackSectionComponent, ProductFeedbackComponent, QuantityComponent],
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




  showSuccess: boolean = false;
  isInCart: boolean = false;
  private alertTimeout: any;
  isLoading: boolean = false;




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

  // onQuantityChange() {
  //   console.log('Updated Quantity:', this.quantity );
  //   this.addtocart()
  // }

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

  // addtocart() {
  //  // Replace with dynamic userId if needed
  //   console.log('Adding to cart with ID:', this.id, 'User ID:', this.userId); // Debug log

  //   this.apis
  //     .addToCart(this.id, this.userId, this.colorId, this.sizeId, this.quantity)
  //     .subscribe(
  //       (response) => {
  //         console.log('Item added to cart successfully:', response);
  //         this.cartService.getCartCount();
  //         alert('Product added to cart!'); // Alert message
  //       },
  //       (error) => {
  //         console.error('Error adding item to cart:', error);
  //       }
  //     );
  // }



  // addtocart() {
  //   if (this.colorId && this.sizeId) {
  //     this.apis.addToCart(this.id, this.userId, this.colorId, this.sizeId, this.quantity)
  //       .subscribe({
  //         next: (response) => {
  //           console.log('Item added to cart successfully:', response);
  //           this.cartService.getCartCount();
  //           this.showSuccessAlert();
  //           this.isInCart = true;
  //         },
  //         error: (error) => {
  //           console.error('Error adding item to cart:', error);
  //         }
  //       });
  //   }
  // }

  // showSuccessAlert() {
  //   this.showSuccess = true;

  //   // Clear any existing timeout
  //   if (this.alertTimeout) {
  //     clearTimeout(this.alertTimeout);
  //   }

  //   // Auto hide alert after 3 seconds
  //   this.alertTimeout = setTimeout(() => {
  //     this.closeAlert();
  //   }, 3000);
  // }

  closeAlert() {
    this.showSuccess = false;
  }

  ngOnDestroy() {
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }







  // toggleCart() {
  //   if (this.isLoading) return;

  //   this.isLoading = true;

  //   if (this.isInCart) {
  //     this.removeFromCart();
  //   } else {
  //     this.addtocart();
  //   }
  // }

  addtocart() {
    if (this.colorId && this.sizeId) {
      this.apis.addToCart(this.id, this.userId, this.colorId, this.sizeId, this.quantity)
        .subscribe({
          next: (response) => {
        this.isLoading=false;
            console.log('Item added to cart successfully:', response);
            this.cartService.getCartCount();
            this.isInCart = true;

  this.showSuccessAlert('Product added to cart successfully!');

      this.isLoading=false;
          },
          error: (error) => {
            console.error('Error adding item to cart:', error);
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }

  showSuccessAlert(message: string) {
    this.message = message;
    this.showSuccess = true;

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.alertTimeout = setTimeout(() => {
      this.closeAlert();
    }, 4000);
  }



  // removeFromCart() {
  //   this.apis.deleteFromCart(this.id,this.userId)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Item removed from cart successfully:', response);
  //         this.cartService.getCartCount();
  //         this.isInCart = false;
  //         this.showSuccessAlert('Product removed from cart successfully!');
  //       },
  //       error: (error) => {
  //         console.error('Error removing item from cart:', error);
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });
  // }
}
