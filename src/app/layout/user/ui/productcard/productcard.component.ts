import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss'
})
export class ProductcardComponent {
  constructor(public api:ApiServiceService){}

  @Input() cards:any={
    category:'',
colors:[],
id:0,
imageUrl:'',
name:'',
price:0,
size:'',
type:''
  }
}
