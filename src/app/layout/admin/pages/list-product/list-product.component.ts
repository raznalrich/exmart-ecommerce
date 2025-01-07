import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from '../edit-product/edit-product.component';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, EditProductComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {

  products: Product[] = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Another Product', price: 200 },
    { id: 3, name: 'Third Product', price: 300 },
  ];

  // Controls the modal
  showModal = false;

  // Holds whichever product the user wants to edit
  selectedProduct: Product | null = null;

  constructor() {}

  onEdit(product: Product) {
    console.log('[ProductListComponent] Edit clicked for:', product);
    this.selectedProduct = product;
    this.showModal = true;
  }

  // Called when child component emits "close"
  onCloseModal() {
    console.log('[ProductListComponent] Modal close received');
    this.showModal = false;
    this.selectedProduct = null;
  }
}
