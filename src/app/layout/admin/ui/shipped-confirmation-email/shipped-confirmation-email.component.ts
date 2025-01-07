import { Component } from '@angular/core';
import { OrderConfirmationTickAnimationComponent } from "../../../user/ui/order-confirmation-tick-animation/order-confirmation-tick-animation.component";
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';

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
  constructor(public api: ApiServiceService, private route: ActivatedRoute) {}
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.api.updateOrderStatusbyid(this.id).subscribe({
        next: (res: any) => {
          this.trackorder = res;
          console.log('Order details:', this.trackorder);
        },
        error: (error) => {
        
          console.error('Error fetching order details:', error);
        }
      });

  }

}
