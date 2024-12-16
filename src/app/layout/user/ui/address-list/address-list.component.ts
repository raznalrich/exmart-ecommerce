import { Component, Input } from '@angular/core';
import { AddressCardComponent } from '../address-card/address-card.component';
import { ProfileAddressCardComponent } from "../profile-address-card/profile-address-card.component";

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [ProfileAddressCardComponent],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent {
  @Input() addresses: { label: string; name: string; phone: string; address: string }[] = [];

  onEdit(address: any) {
    console.log('Edit address:', address);
  }

  onDelete(address: any) {
    console.log('Delete address:', address);
  }
}
