import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,CommonModule],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss'
})
export class ProductcardComponent {
color: any;
  constructor(public api:ApiServiceService){}

  @Input() cards:any
}
