import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddtocartpageComponent } from './layout/user/pages/addtocartpage/addtocartpage.component';
import { ThankyoupageComponent } from './layout/user/pages/thankyoupage/thankyoupage.component';
// import { UsernavbarComponent } from "./layout/user/ui/usernavbar/usernavbar.component";
// import { SidebarComponent } from "./layout/admin/ui/sidebar/sidebar.component";
import { AdminDashboardComponent } from './layout/admin/pages/admin-dashboard/admin-dashboard.component';
import { HomepageComponent } from './layout/user/homepage/homepage.component';
import { UsernavbarComponent } from './layout/user/ui/usernavbar/usernavbar.component';
import { SidebarComponent } from './layout/admin/ui/sidebar/sidebar.component';

import { ProductlistComponent } from './layout/admin/pages/productlist/productlist.component';
import { AddButtonComponent } from './layout/admin/ui/add-button/add-button.component';

import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';

import { NewAddressComponent } from './layout/user/pages/new-address/new-address.component';
import { SelectAddressComponent } from './layout/user/pages/select-address/select-address.component';
import { UserOrdersComponent } from './layout/user/pages/user-orders/user-orders.component';
import { HomeStaticComponent } from './layout/user/pages/home-static/home-static.component';

// import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';
// import { UsersidebarComponent } from './layout/user/ui/usersidebar/usersidebar.component';
import { CategoryButtonComponent } from './layout/user/ui/category-button/category-button.component';
import { AddProductsComponent } from './layout/admin/pages/add-products/add-products.component';
import { AddressConfirmPageComponent } from './layout/user/pages/address-confirm-page/address-confirm-page.component';
<<<<<<< HEAD
import { OrderPopupComponent } from "./layout/admin/ui/order-popup/order-popup.component";

=======
import { UsersidebarComponent } from './layout/user/ui/usersidebar/usersidebar.component';
import { ReportPageComponent } from './layout/admin/pages/report-page/report-page.component';
>>>>>>> d95808a52118e21243135443cfbd0ad3dac11f1a

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    HomepageComponent,
    UsernavbarComponent,
    SidebarComponent,
    ProductlistComponent,
    ThankyoupageComponent,
    AddButtonComponent,
    SingleproductpageComponent,
    AddtocartpageComponent,
    UsersidebarComponent,
    CategoryButtonComponent,
    NewAddressComponent,
    SelectAddressComponent,
    UserOrdersComponent,
    HomeStaticComponent,
    AddProductsComponent,
<<<<<<< HEAD
    RouterOutlet, HomepageComponent, UsernavbarComponent, SidebarComponent, ProductlistComponent, ThankyoupageComponent, AddButtonComponent, SingleproductpageComponent, AddtocartpageComponent, AddressConfirmPageComponent,
    OrderPopupComponent
],
=======
    RouterOutlet,
    HomepageComponent,
    UsernavbarComponent,
    SidebarComponent,
    ProductlistComponent,
    ThankyoupageComponent,
    AddButtonComponent,
    SingleproductpageComponent,
    AddtocartpageComponent,
    AddressConfirmPageComponent,
  ],
>>>>>>> d95808a52118e21243135443cfbd0ad3dac11f1a

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ExMart';
}
