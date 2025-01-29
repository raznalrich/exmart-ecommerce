import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-billing-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe,CommonModule],
  templateUrl: './billing-detail.component.html',
  styleUrl: './billing-detail.component.scss'
})
export class BillingDetailComponent {
@Input() OrderDetailsByID : any
}
