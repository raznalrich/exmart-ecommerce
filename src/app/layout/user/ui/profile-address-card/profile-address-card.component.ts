import { AddAddressDTO } from './../../../../services/api-service.service';
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
  styleUrl: './profile-address-card.component.scss',
})
export class ProfileAddressCardComponent {
  constructor(
    public apis: ApiServiceService,
    private route: ActivatedRoute,
    public global: GlobalService
  ) {}
  @Input() address: any= {
    name: '',
    addressTypeName: 0,
    place: '',
    buildingNo: '',
    pincode: '',
    city: '',
    district: '',
    state: '',
    // country: '',
    // phoneNo: '',
  };
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.address.id);

  }

  onDelete() {
    this.delete.emit(this.address.id);
  }
}
