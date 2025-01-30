import { address } from './../../interfaces/AddressInterface';

import { Component, Input,Output, EventEmitter, signal } from '@angular/core';
import { AddressBadgeComponent } from '../address-badge/address-badge.component';
import { ApiService } from '../../../../api.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [AddressBadgeComponent],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  constructor(public api:ApiServiceService,public global:GlobalService){}
  // selectedAddressId = signal<string>('');
@Input()address:any={
name:'',
addressTypeName:0,
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
handleRadioChange(address: any): void {
  // const target = event.target as HTMLInputElement;
  if (address) {
    this.global.selectedAddressId.set(address.id);
    this.global.selectedAddressTypeName.set(address.addressTypeName);
    console.log('Selected Address ID:', this.global.selectedAddressId());
    console.log('Selected Address Type name:', this.global.selectedAddressTypeName() );
  }
}
  ngOnInit() {
  //  this.address= this.api.getAddressByUserId(1).subscribe((res: any) => {
  //     this.address = res;

  //     console.log(this.address);
  //     // console.log("Name : ",this.arr[0].name);
  // }
  console.log(this.address);
}
}
