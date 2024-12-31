import { Component } from '@angular/core';
import { ProductcardComponent } from "../../ui/productcard/productcard.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  // add other properties as needed
}

@Component({
  selector: 'app-see-all-products-page',
  standalone: true,
  imports: [ProductcardComponent,RouterLink],
  templateUrl: './see-all-products-page.component.html',
  styleUrl: './see-all-products-page.component.scss'
})
export class SeeAllProductsPageComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategories: Set<string> = new Set();
  allProList: any;

  constructor(public api:ApiServiceService,private route: ActivatedRoute){}

ngOnInit(){


  this.api.getProducts().subscribe((res: any) => {
    this.allProList = res;
    console.log(this.allProList)});
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.filterProducts();
  }

  filterProducts() {
    if (this.selectedCategories.size === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategories.has(product.category)
      );
    }
  }
}
