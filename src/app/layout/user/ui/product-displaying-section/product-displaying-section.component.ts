import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductcardComponent } from "../productcard/productcard.component";

@Component({
  selector: 'app-product-displaying-section',
  standalone: true,
  imports: [ProductcardComponent],
  templateUrl: './product-displaying-section.component.html',
  styleUrl: './product-displaying-section.component.scss'
})
export class ProductDisplayingSectionComponent {

  id: any;
  private paramSubscription!: Subscription;

  constructor(private route: ActivatedRoute){}
  ngOnInit(){

    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
  }
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
