import { Component, Input } from '@angular/core';
import { ProductcardComponent } from "../../ui/productcard/productcard.component";
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryButtonComponent } from "../../ui/category-button/category-button.component";
import { CommonModule } from '@angular/common';

interface Product {
  categoryName: string;
  id: number;
  name: string;
  category: string;
}
interface Category {
  id: number;
  categoryName: string;
}

@Component({
  selector: 'app-see-all-products-page',
  standalone: true,
  imports: [ProductcardComponent, RouterLink, CategoryButtonComponent,CommonModule],
  templateUrl: './see-all-products-page.component.html',
  styleUrl: './see-all-products-page.component.scss'
})
export class SeeAllProductsPageComponent {
  product: Product[] = [];
  // allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  // filteredProducts: Product[] = [];
  // categories: string[] = [];
  selectedCategories: Set<string> = new Set();
  allProList: Product[] = [];
  CategoryList: Category[] = [];
  // @Input() CategoryList : any;

  constructor(public api:ApiServiceService,private route: ActivatedRoute){}


ngOnInit(){
  this.api.getProducts().subscribe((res: any) => {
    this.allProList = res;
    this.displayedProducts = [...this.allProList];
    // console.log(this.allProList)
    console.log('DisplayedPro API:', this.displayedProducts);
  });

    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      console.log('Categories API:', this.CategoryList);
    });
    this.filterProducts();
  }
  toggleCategory(categoryName: string) {
    if (this.selectedCategories.has(categoryName)) {
      this.selectedCategories.delete(categoryName);
    } else {
      this.selectedCategories.add(categoryName);
    }

    this.filterProducts();
    console.log('Selected Categories:', Array.from(this.selectedCategories));
  }

  filterProducts() {

    if (this.selectedCategories.size === 0) {
      // If no categories selected, show all products
      this.displayedProducts = [...this.allProList];
    } else {
      // Clear the displayed products array
      this.displayedProducts = [];

      // Loop through all products
      for (let i = 0; i < this.allProList.length; i++) {
        // Check if the current product's category is in selected categories
        if (this.selectedCategories.has(this.allProList[i].categoryName)) {
          // Add the product to displayed products if category matches
          this.displayedProducts.push(this.allProList[i]);
        }
      }



    // If no categories are selected, show all products
    // if (this.selectedCategories.size === 0) {
    //   this.displayedProducts = [...this.allProList];
    //   return;
    // }

    // // Filter products based on selected categories
    // this.displayedProducts = this.allProList.filter((product : Product) =>
    //   this.selectedCategories.has(product.categoryName)
    // );
    // console.log(this.selectedCategories);
    console.log('Filtered Products:', this.displayedProducts);
  }





}
//   toggleCategory(category: string) {

//     if (this.selectedCategories.has(category)) {
//       this.selectedCategories.delete(category);
//     } else {
//       this.selectedCategories.add(category);
//     }

//     // If no categories are selected, show all products
//     if (this.selectedCategories.size === 0) {
//       this.displayedProducts = this.allProList;
//     }
//     else {
//       // Filter products based on selected categories
//       this.displayedProducts = this.allProList.filter((product : Product) =>
//         this.selectedCategories.has(product.category)
//       );
//     }
//   }
// }


    // if (this.selectedCategories.has(category)) {
    //   this.selectedCategories.delete(category);
    // } else {
    //   this.selectedCategories.add(category);
    // }
    // this.filterProducts();


  // filterProducts() {
  //   if (this.selectedCategories.size === 0) {
  //     this.filteredProducts = this.allProducts;
  //   } else {
  //     this.filteredProducts = this.allProducts.filter(product =>
  //       this.selectedCategories.has(product.category)
  //     );
  //   }
  // }

}
