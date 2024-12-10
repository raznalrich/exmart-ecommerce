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
pincode:'',
city:'',
district:'',
stste:'',
country:'',
phoneNo:''
}
arr:any;
  ngOnInit() {
   this.address= this.api.getUserAddress().subscribe((res: any) => {
      this.address = res;
      this.arr = this.address.addresses
      console.log(this.arr);
      console.log("Name : ",this.arr[0].name);
  }
)}
}
