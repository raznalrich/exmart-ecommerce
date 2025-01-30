import { Component, Input } from '@angular/core';
import { GlobalService } from '../../../../global.service';
import { OrderEmailContext } from '../../interfaces/OrderEmailContext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thank-you-purchase.component.html',
  styleUrl: './thank-you-purchase.component.scss'
})
export class ThankYouPurchaseComponent {
@Input() orderId=0;
@Input() orderDate:any;
@Input() address:string='';
orderContext:OrderEmailContext[]=[];
constructor(public global:GlobalService){}
ngOnInit(){
this.orderContext=this.global.orderContext();
console.log('thank',this.orderContext);

}

}
