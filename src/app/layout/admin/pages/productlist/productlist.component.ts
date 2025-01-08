import { Component, ViewChild } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { AddButtonComponent } from '../../ui/add-button/add-button.component';
import { TableComponent } from '../../ui/table/table.component';
import { GlobalService } from '../../../../global.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-productlist',
  standalone: true,

  imports: [
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
    // Pass the product to AddProductsComponent for editing
    this.addProductsComponent.setEditMode(product);

    // Open the modal using Bootstrap's JS API
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onAddButtonClick() {
    // Set Add Mode
    this.addProductsComponent.setAddMode();

    // Open the modal
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
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
