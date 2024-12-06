import { Component } from '@angular/core';
import { products } from '../../interface/product-display.interface';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent {

  items:products={
    id: 0,
    image: '',
    category: '',
    product: '',
    price: 0
  }
  
}
