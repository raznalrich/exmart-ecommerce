import { Component, Input } from '@angular/core';
import { AddressBadgeComponent } from '../address-badge/address-badge.component';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [AddressBadgeComponent],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  constructor(public api:ApiService){}
@Input()address:any={
name:'',
badgeName:'',
place:'',
buildingNo:'',
pincode:0,
phoneNo:''
}
}
