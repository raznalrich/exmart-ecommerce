import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
@Input() CategoryList : any;

  emailTemplate: string = '';
  constructor(public api:ApiServiceService,public router: Router){
this.loadTemplate();
  }


  ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      // console.log(this.CategoryList);
    });
}
  private generateEmailContent(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px;">
              <h1 style="color: #333; margin: 0;">Contact Request</h1>
              <p style="font-size: 18px; margin-top: 10px;">Reference: HR-${Date.now()}</p>
            </div>

            <div style="margin-top: 20px;">
              <p>Dear HR Team,</p>
              <p>A customer has requested to chat with HR. Please review and respond accordingly.</p>
            </div>

            <div style="margin-top: 30px;">
              <h2 style="color: #444; font-size: 18px;">Request Details</h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                <p>Request Time: ${new Date().toLocaleString()}</p>
                <p>Request Type: HR Chat Request</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #666;">
                This is an automated email sent from your e-commerce system.<br>
                Please handle this request according to standard procedures.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

private async loadTemplate() {
    try {

      this.emailTemplate = await fetch('/template/emailTemplate.html')
        .then(response => response.text());
    } catch (error) {
      console.error('Failed to load email template:', error);
    }
  }
  onSendReplay() {
    const emailContent = this.generateEmailContent();
    console.log(emailContent);

    this.api.sendMail('raznalrich@gmail.com', 'Order confirmed', this.emailTemplate)
    .subscribe({
      next: (response) => {
        console.log('Email sent successfully', response);
        alert("Email sent successfully")
      },
      error: (error) => {
        console.error('Error sending email:', error);
      }
    });

  }

  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
  }
  
}
