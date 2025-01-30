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
    userId:any;
  trackorder: any;
  orderItem:any;
  name:any;
  email:any;
  // orderContext:DeliveryConfirmation[]=[]
  constructor(public api: ApiServiceService, private route: ActivatedRoute,public emailservice:EmailService) {}
  ngOnInit(){
    //  this.api.returnEmailFromId(6).subscribe({
    //   next: (email: string) => {
    //     console.log(email); // "mohammed.ka@experionglobal.com"
    //     this.name = this.parseNameFromEmail(email);
    //   }
    // });
    this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.api.updateOrderStatusbyid(this.id).subscribe({
        next: (res: any) => {
          this.trackorder = res;
          console.log('Order details:', this.trackorder);

          this.api.getOrderItemList().subscribe({
            next: (res: any) => {

              this.orderItem = res.filter((order:any) => order.orderItemId == this.id  );
              this.userId = this.orderItem[0].userId;
              console.log('id',this.userId);

              var subtotal = this.orderItem[0].amount * this.orderItem[0].quantity
              this.api.returnEmailFromId(6).subscribe({
                next: (email: string) => {
                  this.email = email;
                  console.log(email); // "mohammed.ka@experionglobal.com"
                  this.name = this.parseNameFromEmail(email);
                  console.log(this.name);

                  console.log("filtered orders", this.orderItem);
              const orderContext: DeliveryConfirmation = {
                orderitemId: this.orderItem[0].orderItemId,
                customerName: this.name, // Assuming a customerName property exists
                productName: this.orderItem[0].productName,
                quantity: this.orderItem[0].quantity,
                price: this.orderItem[0].amount,
                subtotal: subtotal,
                shippingAddress: this.orderItem[0].shippingAddress, // Assuming a shippingAddress property exists
                orderDate: new Date(this.orderItem[0].orderDate), // Convert orderDate string to Date object
            }
            this.emailservice.sendOrderDeliveryConfirmationEmail(this.email, orderContext).subscribe({
              next: () => {
                console.log('Order confirmation email sent successfully');
              },
              error: (emailError) => {
                console.error('Failed to send order confirmation email:', emailError);
                // Navigate to thank you page even if email fails
              }
            });
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
  parseNameFromEmail(email: string): string {
    if (!email || !email.includes('@')) {
      return '';
    }

    const namePart = email.split('@')[0];
    return namePart
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

}
