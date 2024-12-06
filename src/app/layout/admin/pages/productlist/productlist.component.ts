import { Component } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
})
export class ProductlistComponent {
  constructor(public api: ApiServiceService) {}

  items: any = {
    id: 0,
    image: '',
    category: '',
    product: '',
    price: 0,
  };

  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });
  }
}
