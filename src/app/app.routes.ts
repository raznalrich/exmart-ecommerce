import { HomepageComponent } from './layout/user/homepage/homepage.component';
import { Routes } from '@angular/router';
import { ThankyoupageComponent } from './layout/user/pages/thankyoupage/thankyoupage.component';
import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';
import { HomeStaticComponent } from './layout/user/pages/home-static/home-static.component';
import { DashboardComponent } from './layout/admin/dashboard/dashboard.component';
import { AdminDashboardComponent } from './layout/admin/pages/admin-dashboard/admin-dashboard.component';
import { OrderListComponent } from './layout/admin/pages/order-list/order-list.component';
import { ReportPageComponent } from './layout/admin/pages/report-page/report-page.component';
import { ViewFeedbackComponent } from './layout/admin/pages/view-feedback/view-feedback.component';
import { LoginComponent } from './layout/authentication/login/login.component';
import { AddtocartpageComponent } from './layout/user/pages/addtocartpage/addtocartpage.component';
import { ProductDisplayingSectionComponent } from './layout/user/ui/product-displaying-section/product-displaying-section.component';
import { ProductlistComponent } from './layout/admin/pages/productlist/productlist.component';
import { UserprofileComponent } from './layout/user/pages/userprofile/userprofile.component';
import { NewAddressComponent } from './layout/user/pages/new-address/new-address.component';
import { UserOrdersComponent } from './layout/user/pages/user-orders/user-orders.component';
import { SelectAddressComponent } from './layout/user/pages/select-address/select-address.component';
import { AddProductsComponent } from './layout/admin/pages/add-products/add-products.component';

import { SettingsPageComponent } from './layout/admin/pages/settings-page/settings-page.component';

import { AddressConfirmPageComponent } from './layout/user/pages/address-confirm-page/address-confirm-page.component';
import { AdminSettingsTextEditorComponent } from './layout/admin/pages/admin-settings-text-editor/admin-settings-text-editor.component';
import { OrderPreviewPageComponent } from './layout/user/pages/order-preview-page/order-preview-page.component';
import { SeeAllProductsPageComponent } from './layout/user/pages/see-all-products-page/see-all-products-page.component';


export const routes: Routes = [
  {
    path:'',component: HomepageComponent,children:[
      {
        path:'home', component: HomeStaticComponent,children:[

          {
            path:'category/:id',component:ProductDisplayingSectionComponent
          },
          {
            path:'',redirectTo:'category/1',pathMatch:'full'
          }

        ],

      },
      {
        path:'viewproduct/:id',component:SingleproductpageComponent
      },
      {
        path: 'seeAllProducts',component: SeeAllProductsPageComponent
      },
      {
        path:'addcart',component:AddtocartpageComponent
      },
      {
        path:'addressconfirm',component:AddressConfirmPageComponent
      },
      {
        path: 'orderPreview',component:OrderPreviewPageComponent
      },
      {
        path:"thankyou", component:ThankyoupageComponent
      },
      {
        path:'',redirectTo:'home',pathMatch:'full'
      }
    ]
  },
  {
    path:'userprofile', component:UserprofileComponent,children:[
      {
        path:'addaddress',component:NewAddressComponent
      },
      {
        path:'userorder',component:UserOrdersComponent
      },
      {
        path:'addresspage',component:SelectAddressComponent
      },
      {
        path:'',redirectTo:'userorder',pathMatch:'full'
      }
    ]
  },
  {
    path:'admin',component: DashboardComponent,children:[
      {
        path:'admindashboard',component:AdminDashboardComponent
      },
      {
        path:'productlist',component:ProductlistComponent
      },
      {
        path:'orderlist',component:OrderListComponent
      },
      {
        path:'reportpage',component:ReportPageComponent
      },
      {
        path:'viewfeedback',component:ViewFeedbackComponent
      },
      {
        path:'dialoguebox',component:AddProductsComponent
      },
      {
        path:'settings',component:SettingsPageComponent,children:[
          {
            path:'texteditor',component:AdminSettingsTextEditorComponent
          }
        ]

      },



    ]
  },
  {
    path:'login',component:LoginComponent
  }

];
