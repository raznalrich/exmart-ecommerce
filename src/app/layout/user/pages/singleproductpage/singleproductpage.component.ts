import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SingleCardComponent } from '../../ui/single-card/single-card.component';
import { SingleCarouselComponent } from '../../ui/single-carousel/single-carousel.component';
import { SingleProductDetailComponent } from '../../ui/single-product-detail/single-product-detail.component';
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from '../../ui/single-page-dropdown/single-page-dropdown.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ProductFeedbackComponent } from "../../ui/product-feedback/product-feedback.component";
import { Subscription } from 'rxjs';
import { BredcrumbComponent } from "../../ui/bredcrumb/bredcrumb.component";

@Component({
  selector: 'app-singleproductpage',
  standalone: true,
  imports: [RouterLink,
    SingleCarouselComponent,
    SingleProductDetailComponent,
    SinglePageDropdownComponent,
    ProductFeedbackComponent, BredcrumbComponent],
  templateUrl: './singleproductpage.component.html',
  styleUrl: './singleproductpage.component.scss',
})
export class SingleproductpageComponent implements OnInit,OnDestroy {
  productDetails: any;
  productImages: any[]=[];
  id: any;
  data: any;
  routeSubscription!:Subscription;
  constructor(public api: ApiServiceService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params)=>{
      this.id = params['id'];
      console.log("AAA",this.id);

      this.api.getProductsById(this.id).subscribe((res: any) => {
        this.productDetails = res;
    })

    this.api.getImagesByProductId(this.id).subscribe((response: any) => {
      this.productImages = response;
      console.log('productImages', this.productImages);
    });
    // this.api.getCarouselImages().subscribe((res: any) => {
    //   this.carouselImages = res;
    //   console.log(this.carouselImages);
    // });

    // this.api.getCardImages().subscribe((res: any) => {
    //   this.card = res;
    //   // console.log(this.card);
    // });

      // console.log('productDetails', this.productDetails);

      // console.log("imageCollectionUrl",this.productDetails.imageCollectionUrl);

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
