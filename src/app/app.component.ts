import { Component } from '@angular/core';
import { NewAddressComponent } from "./layout/user/pages/new-address/new-address.component";
import { SelectAddressComponent } from "./layout/user/pages/select-address/select-address.component";
import { UserOrdersComponent } from "./layout/user/pages/user-orders/user-orders.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewAddressComponent, SelectAddressComponent, UserOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
