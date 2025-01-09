import { DeliveryConfirmation } from './../../../user/interfaces/DeliveryConfirmation';
import { Component } from '@angular/core';
import { OrderConfirmationTickAnimationComponent } from "../../../user/ui/order-confirmation-tick-animation/order-confirmation-tick-animation.component";
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, OrderEmailContext } from '../../../../services/api-service.service';
import {  EmailService } from '../../../../services/email.service';

@Component({
  selector: 'app-shipped-confirmation-email',
  standalone: true,
  imports: [OrderConfirmationTickAnimationComponent],
  templateUrl: './shipped-confirmation-email.component.html',
  styleUrl: './shipped-confirmation-email.component.scss'
})
export class ShippedConfirmationEmailComponent {
    id:any;
  trackorder: any;
  orderItem:any;
  // orderContext:DeliveryConfirmation[]=[]
  constructor(public api: ApiServiceService, private route: ActivatedRoute,public emailservice:EmailService) {}
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.api.updateOrderStatusbyid(this.id).subscribe({
        next: (res: any) => {
          this.trackorder = res;
          console.log('Order details:', this.trackorder);

          this.api.getOrderItemList().subscribe({
            next: (res: any) => {

              this.orderItem = res.filter((order:any) => order.orderItemId == this.id  );

              console.log("filtered orders", this.orderItem);
              const orderContext: DeliveryConfirmation = {
                orderitemId: this.orderItem[0].orderItemId,
                customerName: this.orderItem[0].customerName, // Assuming a customerName property exists
                productName: this.orderItem[0].productName,
                quantity: this.orderItem[0].quantity,
                price: this.orderItem[0].amount,
                subtotal: (this.orderItem[0].amount * this.orderItem[0].quantity),
                shippingAddress: this.orderItem[0].shippingAddress, // Assuming a shippingAddress property exists
                orderDate: new Date(this.orderItem[0].orderDate), // Convert orderDate string to Date object
            }
              this.emailservice.sendOrderDeliveryConfirmationEmail('raznalrich@gmail.com', orderContext).subscribe({
                next: () => {
                  console.log('Order confirmation email sent successfully');
                },
                error: (emailError) => {
                  console.error('Failed to send order confirmation email:', emailError);
                  // Navigate to thank you page even if email fails
                }
              });

            },
            error: (err) => {
              console.error('Error loading orders:', err);

            }

          });


        },
        error: (error) => {

          console.error('Error fetching order details:', error);
        }
      });

  }

}
