import { Component, Input } from '@angular/core';
import { AddtoCartDeletebtnComponent } from "../addto-cart-deletebtn/addto-cart-deletebtn.component";
import { CurrencyPipe } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-displaying-bar',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent,CurrencyPipe],
  templateUrl: './product-displaying-bar.component.html',
  styleUrl: './product-displaying-bar.component.scss'
})
export class ProductDisplayingBarComponent {
  @Input() productImage: string = '';
  @Input() productName: string = '';
  @Input() productColor: number = 0;
  @Input() productSize: number = 0;
  @Input() productPrice: number = 0;
  color:any;
  size:any;
 constructor(public api: ApiServiceService, private route: ActivatedRoute) {}
 ngOnInit(){
  this.api.getColorById(this.productColor).subscribe({
    next: (colorData) => {
      this.color = colorData;
      this.color = this.color.colorName
      console.log('color',this.color);

    },
    error: (error) => {
      console.error('Error fetching color:', error);
    }
  });

  // Fetch size details
  this.api.getSizeById(this.productSize).subscribe({
    next: (sizeData) => {
      this.size = sizeData;
      this.size = this.size.size
    },
    error: (error) => {
      console.error('Error fetching size:', error);
    }
  });

 }
}
