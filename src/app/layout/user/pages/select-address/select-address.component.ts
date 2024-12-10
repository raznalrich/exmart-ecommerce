import { Component } from '@angular/core';
import { AddAddressButtonComponent } from '../../ui/add-address-button/add-address-button.component';
import { AddressListComponent } from '../../ui/address-list/address-list.component';

@Component({
  selector: 'app-select-address',
  standalone: true,
  imports: [AddAddressButtonComponent, AddressListComponent],
  templateUrl: './select-address.component.html',
  styleUrl: './select-address.component.scss'
})
export class SelectAddressComponent {
  addresses = [
    {
      label: 'HOME',
      name: 'Hitesh Lal',
      phone: '9544539125',
      address: 'Kalluparavilayil, KRA 82, AKG Lane, Kallampally, Thiruvananthapuram, Kerala, India',
    },
    {
      label: 'WORK',
      name: 'Rahul Mehra',
      phone: '9544531234',
      address: 'Office Complex, MG Road, Kochi, Kerala, India',
    },
  ];

  onAddAddress() {
    console.log('Add Address button clicked');
    // Placeholder logic for adding a new address
    this.addresses.push({
      label: 'NEW',
      name: 'John Doe',
      phone: '9876543210',
      address: '123 New Street, City, State, Country',
    });
  }

  onEditAddress(address: any) {
    console.log('Edit Address:', address);
    // Placeholder logic for editing an address
  }

  onDeleteAddress(address: any) {
    console.log('Delete Address:', address);
    // Placeholder logic for deleting an address
    this.addresses = this.addresses.filter(a => a !== address);
  }
}
