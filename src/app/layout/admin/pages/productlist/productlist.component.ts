import { Component } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { AddButtonComponent } from '../../ui/add-button/add-button.component';
import { TableComponent } from '../../ui/table/table.component';
import { GlobalService } from '../../../../global.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AddProductsComponent } from '../add-products/add-products.component';

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
  onClickButton() {
    console.log('Added product');
  }
  constructor(public api: ApiServiceService) {}

  items: any;
  header: any = ['Id', 'Image', 'Category', 'Product', 'Price', 'Actions'];

  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });
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

  button: any = {
    id: 1,
    icon: 'bi bi-plus-circle',
    title: 'Create New',
  };
}
