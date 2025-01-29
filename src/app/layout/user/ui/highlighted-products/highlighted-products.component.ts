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
        // Group and sum quantities by product
        const productSales = orders.reduce((acc, order) => {
          const existing = acc.find(p => p.productId === order.productId);
          if (existing) {
            existing.totalSold += order.quantity;
          } else {
            acc.push({
              productId: order.productId,
              imageUrl: order.primaryImageUrl,
              productName: order.productName,
              amount: order.amount,
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
  }

  // mainImage = 'staticimages/pro_tshirt.png'; // Replace with your dynamic URL
  // subItems = [
  //   {
  //     imageUrl: 'https://media.karousell.com/media/photos/products/2023/4/29/gildan_zipup_hoodie_1682750904_29598b39.jpg', // Replace with dynamic URLs
  //     altText: 'Black Polo Shirt',
  //   },
  //   {
  //     imageUrl: 'https://m.media-amazon.com/images/I/61eYApdaTDL._SL1100_.jpg', // Replace with dynamic URLs
  //     altText: 'Black Hoodie',
  //   },];
}
