import { Component } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { AddButtonComponent } from '../../ui/add-button/add-button.component';
import { TableComponent } from '../../ui/table/table.component';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [AddButtonComponent, TableComponent],
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

  header: any = [
    {
      id: 1,
      title: 'Id',
    },
    {
      id: 2,
      title: 'Image',
    },
    {
      id: 3,
      title: 'Category',
    },
    {
      id: 4,
      title: 'Product',
    },
    {
      id: 5,
      title: 'Price',
    },
    {
      id: 6,
      title: 'Actions',
    },
  ];

  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
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
