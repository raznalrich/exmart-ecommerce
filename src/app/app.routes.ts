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
import { ProductDisplayingSectionComponent } from './layout/user/ui/product-displaying-section/product-displaying-section.component';
import { ProductlistComponent } from './layout/admin/pages/productlist/productlist.component';

export const routes: Routes = [
  {
    path:'',component: HomepageComponent,children:[
      {
        path:'home', component: HomeStaticComponent,children:[
          {
            path:'category/:id',component:ProductDisplayingSectionComponent
          },
          {
            path:'',redirectTo:'category/garments',pathMatch:'full'
          }
        ],

      },
      {
        path:'viewproduct/:id',component:SingleproductpageComponent
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
      }
    ]
  },
  {
    path:'login',component:LoginComponent
  }

];
