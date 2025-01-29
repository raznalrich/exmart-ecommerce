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
import { EditPoliciesComponent } from './layout/admin/ui/edit-policies/edit-policies.component';
import { PolicyPageComponent } from './layout/user/pages/policy-page/policy-page.component';
import { PolicyContentComponent } from './layout/user/ui/policy-content/policy-content.component';
import { TrackExmartComponent } from './layout/user/pages/track-exmart/track-exmart.component';
import { ShippedConfirmationEmailComponent } from './layout/admin/ui/shipped-confirmation-email/shipped-confirmation-email.component';
import { AuthGuard } from './authGuard/auth.guard';
import { OrderConfirmedEmailComponent } from './layout/user/pages/order-confirmed-email/order-confirmed-email.component';
import { ConfigurationTabComponent } from './layout/admin/ui/configuration-tab/configuration-tab.component';

export const routes: Routes = [
  {
    path:'',component: HomepageComponent,
    data: { breadcrumb: 'Home' },
    children:[
      {
        path:'home', component: HomeStaticComponent, canActivate: [AuthGuard], data: { role: 'User' }, children:[

          {
            path:'category/:id',component:ProductDisplayingSectionComponent,

          },

          {
            path:'',redirectTo:'category/1',pathMatch:'full',

          },
        ],

      },
      {
        path: 'policies',
        component: PolicyPageComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'terms', pathMatch: 'full' },
          { path: ':type', component: PolicyContentComponent,
            data: { breadcrumb: 'Policy Content' }
           }
        ]
      },
      {
        path:'viewproduct/:id',component:SingleproductpageComponent,
        data: { breadcrumb: 'View Product' }
      },
      {
        path: 'seeAllProducts',component: SeeAllProductsPageComponent, canActivate: [AuthGuard], data: { role: 'User' }, children:[
          {
            path: 'seeAllProducts/category/:id', component: SeeAllProductsPageComponent,
            data: { breadcrumb: 'See All Products' }
          }
        ],
      },
      {
        path:'addcart',component:AddtocartpageComponent,
        data: { breadcrumb: 'Add to cart' },
      },
      {
        path:'addressconfirm',component:AddressConfirmPageComponent,
        data: { breadcrumb: 'Confirm Address' },
      },
      {
        path: 'orderPreview',component:OrderPreviewPageComponent,
        data: { breadcrumb: 'Order Preview' },
      },
      {
        path:"thankyou", component:ThankyoupageComponent,
        data: { breadcrumb: 'Thank You' },

      },
      {
        path:'',redirectTo:'home',pathMatch:'full'
      }
    ]
  },
  {
    path:'userprofile', component:UserprofileComponent,
    data: { breadcrumb: 'User Profile', role: 'User' },
    canActivate: [AuthGuard], children:[
      {
        path:'addaddress',component:NewAddressComponent,
        data: { breadcrumb: 'Add New Address' }
      },
      {
        path:'userorder',component:UserOrdersComponent,
        data: { breadcrumb: 'My Orders' }
      },
      {
        path:'addresspage',component:SelectAddressComponent,
        data: { breadcrumb: 'Select Address' }
      },
      {
        path:'',redirectTo:'userorder',pathMatch:'full'
      }
    ]
  },
  {
    path:'admin',component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' }, children:[
      {
        path:'admindashboard',component:AdminDashboardComponent,
        data: { breadcrumb: 'Admin Dashboard' }
      },
      {
        path:'productlist',component:ProductlistComponent,
        data: { breadcrumb: 'Product List' }
      },
      {
        path:'orderlist',component:OrderListComponent,
        data: { breadcrumb: 'Order List' }
      },
      {
        path:'reportpage',component:ReportPageComponent,
        data: { breadcrumb: 'Report Page' }
      },
      {
        path:'viewfeedback',component:ViewFeedbackComponent,
        data: { breadcrumb: 'View Feedback' }
      },
      {
        path:'dialoguebox',component:AddProductsComponent,
        data: { breadcrumb: 'Add Products' }
      },
      {
        path:'settings',component:SettingsPageComponent,
        data: { breadcrumb: 'Settings' }
      },
      {
        path:'configuration-tab',component:ConfigurationTabComponent,
        data: { breadcrumb: 'Configuration Tab' }
      },
      {
        path:'texteditor/:id',component:AdminSettingsTextEditorComponent,
        data: { breadcrumb: 'Text Editor' }
      }
    ]
  },
  {
    path:'login',component:LoginComponent
  },
   {
    path:"trackexmart/:id",component:TrackExmartComponent,
    data: { breadcrumb: 'Track Exmart' }
  },
  {
    path:"updateStatusBy/:id",component:ShippedConfirmationEmailComponent,
    data: { breadcrumb: 'Order Status' }
  },
  {
    path:"orderconfirmed/:id",component:OrderConfirmedEmailComponent,
    data: { breadcrumb: 'Order Confirmation' }
  }

];
