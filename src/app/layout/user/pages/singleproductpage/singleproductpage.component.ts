import { Component, Input } from '@angular/core';
import { SingleCardComponent } from '../../ui/single-card/single-card.component';
import { SingleCarouselComponent } from '../../ui/single-carousel/single-carousel.component';
import { SingleProductDetailComponent } from '../../ui/single-product-detail/single-product-detail.component';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../../ui/single-page-dropdown/single-page-dropdown.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleproductpage',
  standalone: true,
  imports: [
    SingleCardComponent,
    SingleCarouselComponent,
    SingleProductDetailComponent,
    SinglePageDropdownComponent,
  ],
  templateUrl: './singleproductpage.component.html',
  styleUrl: './singleproductpage.component.scss',
})
export class SingleproductpageComponent {
  productDetails: any;
  productImages: any;
  id: any;
  data: any;
  constructor(public api: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    // this.api.getCarouselImages().subscribe((res: any) => {
    //   this.carouselImages = res;
    //   console.log(this.carouselImages);
    // });

    // this.api.getCardImages().subscribe((res: any) => {
    //   this.card = res;
    //   // console.log(this.card);
    // });
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.api.getProductsById(this.id).subscribe((res: any) => {
      this.productDetails = res;
      // console.log('productDetails', this.productDetails);

      // console.log("imageCollectionUrl",this.productDetails[0].imageCollectionUrl);
    });

    this.api.getImagesByProductId(this.id).subscribe((res: any) => {
      this.productImages = res;
      console.log('productImages', this.productImages);
    });
  }
}
