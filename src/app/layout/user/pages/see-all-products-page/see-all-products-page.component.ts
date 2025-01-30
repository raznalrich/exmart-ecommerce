import { Component, Input } from '@angular/core';
import { ProductcardComponent } from "../../ui/productcard/productcard.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryButtonComponent } from "../../ui/category-button/category-button.component";
import { CommonModule } from '@angular/common';
import { Category, Product } from '../../interfaces/productInterface';


@Component({
  selector: 'app-see-all-products-page',
  standalone: true,
  imports: [ProductcardComponent,CommonModule],
  templateUrl: './see-all-products-page.component.html',
  styleUrl: './see-all-products-page.component.scss'
})
export class SeeAllProductsPageComponent {
  product: Product[] = [];
  displayedProducts: Product[] = [];
  allProList: Product[] = [];
  CategoryList: Category[] = [];
  selectedCategories: number[] = [];

  constructor(public api:ApiServiceService,private route: ActivatedRoute){}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.api.getAllCategories().subscribe((categories: Category[]) => {
      this.CategoryList = categories;

      this.api.getProducts().subscribe((products: any) => {
        this.allProList = products;
        this.filterProducts();
      });
    });
  }

  onCategoryChange(categoryId: number) {
    const index = this.selectedCategories.indexOf(categoryId);

    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.filterProducts();
  }

  private filterProducts() {
    if (this.selectedCategories.length === 0) {
      this.displayedProducts = [...this.allProList].sort((a, b) => a.categoryId - b.categoryId);
    } else {
      this.displayedProducts = this.allProList.filter(product =>
        this.selectedCategories.includes(product.categoryId)
      ).sort((a, b) => a.categoryId - b.categoryId);
    }
  }
}
