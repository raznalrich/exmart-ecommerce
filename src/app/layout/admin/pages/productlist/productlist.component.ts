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
  isAddProductVisible: boolean = false;
  // onClickButton() {
  //   console.log('Added product');
  // }
  constructor(public api: ApiServiceService) {}

  items: any;
  header: any = ['Id', 'Image', 'Category', 'Product', 'Price', 'Actions'];

  button: any = {
    id: 1,
    icon: 'bi bi-plus-circle',
    title: 'Create New',
  };

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });
  }

  onEditProduct(product: any) {
    // Pass the product to AddProductsComponent for editing
    // this.addProductsComponent.setEditMode(product);

    // Open the modal using Bootstrap's JS API
    // const modalElement = document.getElementById('staticBackdrop');
    // if (modalElement) {
    //   const modal = new bootstrap.Modal(modalElement);
    //   modal.show();
    // }
  }
  onCloseAddProduct() {
    this.isAddProductVisible = false;
  }
  onAddButtonClick() {
    // Set Add Mode
    // this.addProductsComponent.setAddMode();
    this.isAddProductVisible = true;
    // Open the modal
    // const modalElement = document.getElementById('staticBackdrop');
    // if (modalElement) {
    //   const modal = new bootstrap.Modal(modalElement);
    //   modal.show();
    // }
  }
  add(){
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
