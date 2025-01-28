import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductcardComponent } from "../productcard/productcard.component";
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-product-displaying-section',
  standalone: true,
  imports: [ProductcardComponent,RouterLink],
  templateUrl: './product-displaying-section.component.html',
  styleUrl: './product-displaying-section.component.scss'
})
export class ProductDisplayingSectionComponent {

  id: any;
  data:any;
  private paramSubscription!: Subscription;

  constructor(private route: ActivatedRoute,public api:ApiServiceService ,public router: Router){}
  ngOnInit(){
    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log(this.id);

      this.data = this.api.getProducts().subscribe((res:any)=>{
        this.data = res.
        filter((item: any) => item.categoryId == this.id && item.isActive==true);
        console.log(this.data);

      })
    });


  }
  navigateToPolicy() {
    this.router.navigate(['/seeAllProducts'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
