import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductcardComponent } from "../productcard/productcard.component";
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-product-displaying-section',
  standalone: true,
  imports: [ProductcardComponent],
  templateUrl: './product-displaying-section.component.html',
  styleUrl: './product-displaying-section.component.scss'
})
export class ProductDisplayingSectionComponent {

  id: any;
  data:any;
  private paramSubscription!: Subscription;

  constructor(private route: ActivatedRoute,public api:ApiServiceService){}
  ngOnInit(){
    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.data = this.api.getproduct().subscribe((res:any)=>{
        this.data = res.filter((item: any) => item.category === this.id);
        console.log(this.data);

      })
    });


  }
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
