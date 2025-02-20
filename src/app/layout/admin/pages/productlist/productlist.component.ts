import { Component, ViewChild } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { AddButtonComponent } from '../../ui/add-button/add-button.component';
import { TableComponent } from '../../ui/table/table.component';
import { GlobalService } from '../../../../global.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productlist',
  standalone: true,

  imports: [
    CommonModule,
    AddButtonComponent,
    TableComponent,
    SearchbarComponent,
    AddProductsComponent,
  ],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
})
export class ProductlistComponent {

  @ViewChild(AddProductsComponent) addProductsComponent!: AddProductsComponent;
  filteredItems: any = [];
  searchPlaceholder: string = 'Search Product';
  isAddProductVisible: boolean = false;
  isEditmode: boolean = false;
  editProductDetails: any;
  showSuccessAlert = false;
  successMessage = '';

  constructor(public api: ApiServiceService) {}

  items: any;
  header: any = ['Id', 'Image', 'Product', 'Category', 'Price', 'Actions'];

  button: any = {
    id: 1,
    icon: 'bi bi-plus-circle',
    title: 'Create New',
  };

  ngOnInit() {
    this.loadProducts();
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
    });
  }

  loadProducts() {
    this.api.getProducts().subscribe((res: any) => {
      this.filteredItems = res;
    });
  }

  onSearch(searchTerm: any) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = [...this.items];
      return;
    }
    this.filteredItems = this.items.filter((item: any) => {
      return item.name && item.name.toLowerCase().includes(term);
    });
    // console.log(this.filteredItems);
    if (this.filteredItems.length === 0) {
      console.log('No matching results found for:', term);
    }
  }

  onEditProduct(product: any) {
    this.isEditmode = true;
    this.editProductDetails = product;
    this.isAddProductVisible = true;
    console.log('Editing product:', this.editProductDetails);
  }

  onCloseAddProduct() {
    this.isAddProductVisible = false;
    this.isEditmode = false; // Reset edit mode when modal is closed
    this.editProductDetails = null; // Clear product details when modal is closed
  }

  onAddButtonClick() {
    this.isEditmode = false; // Ensure add mode
    this.editProductDetails = null; // Clear any existing data
    this.isAddProductVisible = true; // Show the modal
  }

  onProductSaved(): void {
    this.loadProducts();
    this.successMessage = this.isEditmode
      ? 'Product updated successfully!'
      : 'Product added successfully!';
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }

  add() {
    this.isAddProductVisible = true;
  }

  icons: any = [
    {
      id: 1,
      image: 'bi bi-pen',
      bgColor: '#5DADE2',
    },
    {
      id: 2,
      image: 'bi bi-trash3',
      bgColor: '#EC7063',
    },
  ];
}
