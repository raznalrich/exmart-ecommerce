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
  createdAt: string;
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
  shippingCharge: number;
  orderItemId: number;

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
  @Input() orderItemId:number=0;
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() imageUrl: string = '';
  @Input() status: any;

  @Input() ProId:number=0;
  @Input() Procolor: string = '';
  @Input() ProSize: string = '';
  @Input() ProPrice: string = '';
  @Input() ProQuant: number = 0;
  @Input() ProShipCharge: number =0;
  @Input() AddressLine: string = '';
  @Input() ProOrderDate: Date | undefined ;
  TotalAmount : number = 0;

  isSubmitting=false;
  isExpanded: boolean = false;

  toggleDetails(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isExpanded = !this.isExpanded;
  }
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
        // console.log("orderData",orderData);
        this.orderItemslist = this.orderData.orderItems
        // console.log('orderitemList',this.orderItemslist);


        // this.fetchProductImages();
        // this.color = this.orderItemslist.colorName;
        // console.log('color', this.color);
      },
      error: (error) => {
        console.error('Error fetching color:', error);
      },
    });

    this.TotalAmount = this.amount + this.ProShipCharge;
}
routeToPro(ProId : number){
  this.router.navigate(['/viewproduct',ProId ])
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
sendCancel(id:number){
  console.log('order item id',id);

  this.isSubmitting=true;
  this.api.GetOrderDetailById(this.id).subscribe({
    next: (orderData) => {

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
                  shippingAddress: this.orderData.addressLine,
                  orderDate: new Date(this.orderData.createdAt)
                };
                this.emailservice.sendOrderCancellationEmail('raznalrich@gmail.com', orderContext).subscribe({
                  next: () => {
                    console.log('Order Cancellation email sent successfully');
                    this.api.RequestOrderCancelStatusbyid(id).subscribe({
                      next: (res: any) => {
                        console.log('status',res);
                        this.isSubmitting=false;
                        this.router.navigate(['userorder']);
                        this.ngOnInit();
                      }
                    });

                    this.ngOnInit();
                  },
                  error: (emailError) => {
                    console.error('Failed to send order cancellation email:', emailError);
                    // Navigate to thank you page even if email fails
                    this.router.navigate(['/thankyou']);
                  }
                });
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
}
}
