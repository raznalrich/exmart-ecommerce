import { Component } from '@angular/core';
import { products } from '../../interface/product-display.interface';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [ButtonComponent],
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

  ngOnInit() {
    this.api.getProducts().subscribe((res: any) => {
      this.items = res;
    });
  }

  icons:any = [{
    id:1,
    image:"bi bi-pen",
    bgColor:"#5DADE2"
  },
  {
    id:2,
    image:"bi bi-trash3",
    bgColor:"#EC7063"
  }];
}
