import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AddtocartpageComponent } from './layout/user/pages/addtocartpage/addtocartpage.component';

import { ThankyoupageComponent } from './layout/user/pages/thankyoupage/thankyoupage.component';
import { HomepageComponent } from "./layout/user/homepage/homepage.component";
import { UsernavbarComponent } from "./layout/user/ui/usernavbar/usernavbar.component";
import { SidebarComponent } from "./layout/admin/ui/sidebar/sidebar.component";

import { ProductlistComponent } from "./layout/admin/pages/productlist/productlist.component";
import { AddButtonComponent } from "./layout/admin/ui/add-button/add-button.component";


import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';
import { UsersidebarComponent } from "./layout/user/ui/usersidebar/usersidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,


  imports: [RouterOutlet, HomepageComponent, UsernavbarComponent, SidebarComponent, ProductlistComponent, ThankyoupageComponent, AddButtonComponent,SingleproductpageComponent,AddtocartpageComponent,UsersidebarComponent],



  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
