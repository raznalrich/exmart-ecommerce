import { Component, computed, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { OrderItem, TopProduct } from '../../interface/order.interface';
import { AdminAllSoldProsListComponent } from "../admin-all-sold-pros-list/admin-all-sold-pros-list.component";

@Component({
  selector: 'app-admin-top-products-chart',
  standalone: true,
  imports: [AdminAllSoldProsListComponent],
  templateUrl: './admin-top-products-chart.component.html',
  styleUrl: './admin-top-products-chart.component.scss'
})
export class AdminTopProductsChartComponent {

  private orderDetails = signal<OrderItem[]>([]);
  showModal = signal(false);
  

  allProducts = computed(() => this.calculateTopProducts(this.orderDetails()));
  topThreeProducts = computed(() => this.allProducts().slice(0, 3));

  @Input() set AllOrderDetails(value: OrderItem[]) {
    this.orderDetails.set(value || []);
  }

calculateTopProducts(orders: OrderItem[]): TopProduct[] {
    if (!orders.length) return [];

    const productMap = new Map<number, TopProduct>();

    orders.forEach(order => {
      if (!order) return;

      const existing = productMap.get(order.productId);
      if (existing) {
        existing.totalQuantity += order.quantity || 0;
        console.log('total quant', existing.totalQuantity);

      } else {
        productMap.set(order.productId, {
          productId: order.productId,
          productName: order.productName,
          primaryImageUrl: order.primaryImageUrl,
          totalQuantity: order.quantity || 0
        });

      }
    });

    return Array.from(productMap.values())
      .sort((a, b) => b.totalQuantity - a.totalQuantity);
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placeholder-image.png';
  }
}
