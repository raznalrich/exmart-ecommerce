import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { TopProduct } from '../../interfaces/productInterface';
import { OrderItem } from '../../../admin/interface/order.interface';

@Component({
  selector: 'app-highlighted-products',
  standalone: true,
  imports: [],
  templateUrl: './highlighted-products.component.html',
  styleUrl: './highlighted-products.component.scss'
})
export class HighlightedProductsComponent {
  constructor(private apiService: ApiServiceService,private router: Router) {}

  topProducts: TopProduct[] = [];
  mainProduct?: TopProduct;
  subProducts: TopProduct[] = [];

  ngOnInit() {
    this.apiService.getOrderDetail().subscribe({
      next: (orders: OrderItem[]) => {
        const productSales = orders.reduce((acc, order) => {
          const existing = acc.find(p => p.productId === order.productId);
          if (existing) {
            existing.totalSold += order.quantity;
          } else {
            acc.push({
              productId: order.productId,
              imageUrl: order.primaryImageUrl,
              productName: order.productName,
              amount: order.product_amount,
              totalSold: order.quantity
            });
          }
          return acc;
        }, [] as TopProduct[]);

        this.topProducts = productSales.sort((a, b) => b.totalSold - a.totalSold);

        if (this.topProducts.length > 0) {
          this.mainProduct = this.topProducts[0];
          this.subProducts = this.topProducts.slice(1, 3);
        }
        console.log('main pros',this.mainProduct);
        console.log('sub pros',this.subProducts);


      },
      error: (error) => {
        console.error('Error fetching top products:', error);
      }
    });
  }

  navigateToProduct(productId: number) {
    this.router.navigate([`/viewproduct/${productId}`]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
