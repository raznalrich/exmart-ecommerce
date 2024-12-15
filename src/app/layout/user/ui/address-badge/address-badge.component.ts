import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-badge',
  standalone: true,
  imports: [],
  templateUrl: './address-badge.component.html',
  styleUrl: './address-badge.component.scss'
})
export class AddressBadgeComponent {
  @Input() badgeName:string='';
}
