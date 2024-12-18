import { Component, Input } from '@angular/core';
import { SingleCardComponent } from '../../ui/single-card/single-card.component';
import { SingleCarouselComponent } from "../../ui/single-carousel/single-carousel.component";
import { SingleProductDetailComponent } from "../../ui/single-product-detail/single-product-detail.component";
import { ApiService } from '../../../../api.service';
import { SinglePageDropdownComponent } from "../../ui/single-page-dropdown/single-page-dropdown.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleproductpage',
  standalone: true,
  imports: [SingleCardComponent, SingleCarouselComponent, SingleProductDetailComponent, SinglePageDropdownComponent],
  templateUrl: './singleproductpage.component.html',
  styleUrl: './singleproductpage.component.scss'
})
export class SingleproductpageComponent {
  carouselImages: any;
  // card:any
// data:any
id:any
  constructor(public api: ApiService, private activateroute: ActivatedRoute) {}
  ngOnInit() {
    // this.api.getCarouselImages().subscribe((res: any) => {
    //   this.carouselImages = res;
    //   console.log(this.carouselImages);
    // });

    // this.api.getCardImages().subscribe((res: any) => {
    //   this.card = res;
    //   // console.log(this.card);
    // });
    this.id=this.activateroute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.api.getProductsById(this.id).subscribe((res: any) => {
      this.carouselImages = res;
      console.log("name",this.carouselImages[0].imageCollectionUrl);
    });
  }
}
