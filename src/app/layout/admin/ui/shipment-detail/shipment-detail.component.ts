import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [],
  templateUrl: './shipment-detail.component.html',
  styleUrl: './shipment-detail.component.scss'
})
export class ShipmentDetailComponent {
@Input() OrderDetailsByID : any
}
