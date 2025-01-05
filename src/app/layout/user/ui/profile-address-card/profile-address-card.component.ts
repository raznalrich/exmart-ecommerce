import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { AddressBadgeComponent } from '../address-badge/address-badge.component';
import { AddressCardComponent } from '../address-card/address-card.component';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-profile-address-card',
  standalone: true,
  imports: [AddressBadgeComponent, AddressCardComponent],
  templateUrl: './profile-address-card.component.html',
  styleUrl: './profile-address-card.component.scss'
})
export class ProfileAddressCardComponent {
  // id:any;
  // @Input() label: string = '';
  // @Input() name: string = '';
  // @Input() phone: string = '';
  // @Input() address: string = '';

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
constructor(public apis: ApiServiceService, private route: ActivatedRoute, public global: GlobalService){}
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

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  arr:any;
  handleRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.global.selectedAddressId.set(target.id);
      console.log('Selected Address ID:', this.global.selectedAddressId());
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
