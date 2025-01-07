import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';
interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  sizeId: number;
  sizeName: string;
  colorId: number;
  colorName: string;
  price: number;
  subTotal: number;
  primaryImageUrl?: string;

}
@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() id:number=0;
  @Input() title: string = '';
  @Input() amount: string = '';
  @Input() quantity: string = '';
  @Input() imageUrl: string = '';
  @Input() status: any;
  statusName:any;
  @Input() OrderedDate: any;
  @Input() statusIcon: string = '';
  productDetails:any;
  orderData:any;
  orderItemslist: OrderItem[] = [];
  constructor(public api:ApiServiceService){}
ngOnInit(){

  
    //Fetch color details
    this.api.GetOrderDetailById(this.id).subscribe({
      next: (orderData) => {
        this.orderData = orderData;
        console.log("Colordata",orderData);
        this.orderItemslist = this.orderData.orderItems
        console.log('order item',this.orderItemslist);
        this.fetchProductImages();

        // this.color = this.color.colorName;
        // console.log('color', this.color);
      },
      error: (error) => {
        console.error('Error fetching color:', error);
      },
    });

}
fetchProductImages() {
  this.orderItemslist.forEach(item => {
    this.api.getProductsById(item.productId).subscribe({
      next: (imageData) => {
        this.productDetails = imageData
        console.log('OrderItemId',item.productId);

        item.primaryImageUrl = this.productDetails.primaryImageUrl
      },
      error: (error) => console.error('Error fetching image:', error)
    });
  });
}
}
