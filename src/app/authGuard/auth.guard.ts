import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Use a proper key

    if (!token) {
      console.log('AuthGuard: No token found. Redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }

    // Get expected role from route data
    const expectedRole = route.data['role'];
    if (!expectedRole) {
      return true; // No role required, allow access
    }

    console.log('AuthGuard: User role:', userRole);
    console.log('AuthGuard: Expected role:', expectedRole);

    if (!userRole || userRole.toLowerCase() !== expectedRole.toLowerCase()) {
      console.log('AuthGuard: Unauthorized access. Redirecting...');

    if (userRole === 'admin') {
      this.router.navigate(['/admin/admindashboard'], { replaceUrl: true });
    } else if (userRole === 'user') {
      this.router.navigate(['/home/category/20'], { replaceUrl: true });
    } else {
      // this.router.navigate(['/home'], { replaceUrl: true });
      return false;
    }

    return false;

    }

    console.log('AuthGuard: Access granted.');
    return true;
  }
}
