import { Component, Input } from '@angular/core';
import { OrderItemComponent } from '../order-item/order-item.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-section',
  standalone: true,
  imports: [OrderItemComponent,CommonModule],
  templateUrl: './order-section.component.html',
  styleUrl: './order-section.component.scss'
})
export class OrderSectionComponent {

  @Input() title: string = '';
  @Input() icon: string = ''; // Bootstrap icon class
  @Input() maxHeight: string = '200px'; // Maximum height of the section
  @Input() items:any[] = [];
  data:any;
  ngOnInit(){
    console.log('hello',this.items);
    // this.api.GetOrderDetailById(this.items).subscribe((res: any) => {
    //   this.data = res;
    //   console.log("componet orders", this.data);

    // });
  }
}
