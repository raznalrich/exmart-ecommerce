import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeStaticComponent } from './layout/user/pages/home-static/home-static.component';
import { HomepageComponent } from "./layout/user/homepage/homepage.component";
import { UsernavbarComponent } from "./layout/user/ui/usernavbar/usernavbar.component";
import { SidebarComponent } from "./layout/admin/ui/sidebar/sidebar.component";
import { OrderPopupComponent } from "./layout/admin/ui/order-popup/order-popup.component";


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, HomepageComponent, UsernavbarComponent, SidebarComponent, OrderPopupComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
