import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { OrderEmailContext } from '../../interfaces/OrderEmailContext';
import { EmailService } from '../../../../services/email.service';
import { Router } from '@angular/router';
export interface Order {
  name: string;
  email: string;
  phone: string;
  orderId: number;
  createdAt: string; // or Date if you prefer
  totalAmount: number;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  orderItems: OrderItem[];
}

// export interface OrderItems {
//   orderItemId: number;
//   productId: number;
//   productName: string;
//   productImageUrl: string;
//   product_StatusId: number;
//   quantity: number;
//   sizeId: number;
//   sizeName: string;
//   colorId: number;
//   colorName: string;
//   shippingCharge: number;
//   price: number;
//   subTotal: number;
// }

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
  isSubmitting=true;

  statusName:any;
  @Input() isVisible:boolean = false;
  @Input() OrderedDate: any;
  @Input() statusIcon: string = '';
  productDetails:any;
  orderData: Order = {
    name: '',
    email: '',
    phone: '',
    orderId: 0,
    createdAt: '',
    totalAmount: 0,
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    orderItems: []
  };
  orderItemslist: OrderItem[] = [];
  constructor(public api:ApiServiceService,public emailservice:EmailService,private router: Router){}
ngOnInit(){


    //Fetch color details
    this.api.GetOrderDetailById(this.id).subscribe({
      next: (orderData) => {
        // this.orderData = orderData;
        // console.log("Colordata",orderData);
        this.orderItemslist = this.orderData.orderItems
        // console.log('order item',this.orderItemslist);
        // this.fetchProductImages();

        // this.color = this.color.colorName;
        // console.log('color', this.color);
      },
      error: (error) => {
        console.error('Error fetching color:', error);
      },
    });

}
sendCancel(id:number){
  this.isSubmitting=true;
  this.api.GetOrderDetailById(this.id).subscribe({
    next: (orderData) => {
      if (orderData) {  // Ensure orderData is valid before assignment
        this.orderData = orderData as Order;
      } else {
        console.error("Order data is undefined");
      }
      console.log("order details",orderData);
      this.orderItemslist = this.orderData.orderItems
      console.log('order item',this.orderItemslist);
      const orderContext: OrderEmailContext = {
                  orderId: this.orderData.orderId,
                  customerName: this.orderData.name,
                  items: this.orderData.orderItems.map((item:any) => ({
                    orderItemId: item.orderItemId,
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity + item.shippingCharge
                  })),
                  totalAmount: this.orderData.totalAmount,
                  shippingAddress: this.orderData.addressLine, // You'll need to format this
                  orderDate: new Date(this.orderData.createdAt)
                };
                this.emailservice.sendOrderCancellationEmail('raznalrich@gmail.com', orderContext).subscribe({
                  next: () => {
                    console.log('Order Cancellation email sent successfully');
                    this.router.navigate(['/thankyou']);
                  },
                  error: (emailError) => {
                    console.error('Failed to send order cancellation email:', emailError);
                    // Navigate to thank you page even if email fails
                    this.router.navigate(['/thankyou']);
                  }
                });
                // this.orderContext = orderContext;
      // this.fetchProductImages();

      // this.color = this.color.colorName;
      // console.log('color', this.color);
    },
    error: (error) => {
      console.error('Error fetching color:', error);
    },
  });
}
makeVisible(){
  this.isVisible = true;
}
onCloseAddProduct() {
  this.isVisible = false;
   // Clear product details when modal is closed
}
// fetchProductImages() {
//   this.orderItemslist.forEach(item => {
//     this.api.getProductsById(item.productId).subscribe({
//       next: (imageData) => {
//         this.productDetails = imageData
//         console.log('OrderItemId',item.productId);

//         item.primaryImageUrl = this.productDetails.primaryImageUrl
//       },
//       error: (error) => console.error('Error fetching image:', error)
//     });
//   });
// }
}
