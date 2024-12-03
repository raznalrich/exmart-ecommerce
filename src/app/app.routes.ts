import { Routes } from '@angular/router';
import { HomepageComponent } from './layout/user/homepage/homepage.component';
import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'cart',
    component: SingleproductpageComponent,
  },
  {
    path: 'profile',
    component: HomepageComponent,
  },
];
