import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { catchError, map, Observable, of } from 'rxjs';
export interface OrderEmailContext {
  orderId: number;
  customerName: string;
  items: Array<{
    orderItemId:number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailTemplate: string = '';
  hrEmailTemplate: string = '';
  constructor(public api:ApiServiceService) {
    this.loadTemplate();
    this.hrLoadTemplate();
  }
  private async hrLoadTemplate(){
    try {

      this.hrEmailTemplate = await fetch('/template/hrConfirmationMail.html')
        .then(response => response.text());
    } catch (error) {
      console.error('Failed to load email template:', error);
    }
  }
  private async loadTemplate() {
    try {

      this.emailTemplate = await fetch('/template/emailTemplate.html')
        .then(response => response.text());
    } catch (error) {
      console.error('Failed to load email template:', error);
    }
  }
  private generateItemRows(items: OrderEmailContext['items']): string {
    return items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.productName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.subtotal.toFixed(2)}</td>


      </td>
      </tr>
    `).join('');
  }
  private generateHRItemRows(items: OrderEmailContext['items']): string {
    return items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.productName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.subtotal.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
        <a href="http://localhost:4200/updateStatusBy/${item.orderItemId}"
           style="display: inline-block; padding: 8px 16px; background-color: #28a745; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">
          Ship Now
        </a>
      </td>
      </tr>
    `).join('');
  }
  private replacePlaceholders(template: string, context: OrderEmailContext): string {
    const itemRows = this.generateItemRows(context.items);

    return template
      .replace('{{orderId}}', String(context.orderId))
      .replace('{{orderParsingId}}', String(context.orderId))
      .replace('{{customerName}}', context.customerName)
      .replace('{{itemRows}}', itemRows)
      .replace('{{totalAmount}}', context.totalAmount.toFixed(2))
      .replace('{{shippingAddress}}', context.shippingAddress)
      .replace('{{orderDate}}', new Date(context.orderDate).toLocaleDateString());
  }
  private replaceHRPlaceholders(template: string, context: OrderEmailContext): string {
    const itemRows = this.generateHRItemRows(context.items);

    return template
      .replace('{{orderId}}', String(context.orderId))
      .replace('{{customerName}}', context.customerName)
      .replace('{{itemRows}}', itemRows)
      .replace('{{totalAmount}}', context.totalAmount.toFixed(2))
      .replace('{{shippingAddress}}', context.shippingAddress)
      .replace('{{orderDate}}', new Date(context.orderDate).toLocaleDateString());
  }
  sendOrderConfirmationEmail(email: string, orderContext: OrderEmailContext): Observable<boolean> {
    const subject = `Order Confirmation - #EXP${orderContext.orderId}`;
    const body = this.replacePlaceholders(this.emailTemplate, orderContext);

    return this.api.sendMail(email, subject, body).pipe(
      map((response) => {
        console.log('Email sent successfully', response);
        alert('Email sent successfully');
        return true; // Return success
      }),
      catchError((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email');
        return of(false); // Return failure
      })
    );
  }
  sendOrderRequestEmail(email: string, orderContext: OrderEmailContext): Observable<boolean> {
    const subject = `New Order request  - #EXP${orderContext.orderId}`;
    const body = this.replaceHRPlaceholders(this.hrEmailTemplate, orderContext);

    return this.api.sendMail(email, subject, body).pipe(
      map((response) => {
        console.log('Email sent successfully', response);
        alert('Email sent successfully');
        return true; // Return success
      }),
      catchError((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email');
        return of(false); // Return failure
      })
    );
  }

}
