import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
<<<<<<< HEAD
import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
=======
import { Injectable } from '@angular/core';
>>>>>>> a738a50c23276f42a7fc32d8a0c700adc212dfb5

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
<<<<<<< HEAD
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole'); // Use a proper key

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
      this.router.navigate(userRole === 'admin' ? ['/admin/admindashboard'] : ['/home']);
=======
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      console.log('AuthGuard: User not logged in. Redirecting to login...');
      this.router.navigate(['login']);
      return false;
    }
    console.log('AuthGuard: User is logged in. Access granted.');

    // Get expected role from route data
   const expectedRole = route.data['role'];
   if (!expectedRole) {
     // If no role is required, just check authentication
     return true;
   }

   const userRole = this.authService.getUserRole();
    console.log('Current user role:', userRole);
    console.log('Expected role:', expectedRole);

    // Check if user has the required role
    if (userRole?.toLowerCase() !== expectedRole.toLowerCase()) {
      console.log('AuthGuard: Invalid role. Redirecting...');
      // Redirect based on user's role
      if (userRole?.toLowerCase() === 'admin') {
        this.router.navigate(['/admin/admindashboard']);
      } else {
        this.router.navigate(['/home']);
      }
>>>>>>> a738a50c23276f42a7fc32d8a0c700adc212dfb5
      return false;
    }

    console.log('AuthGuard: Access granted.');
    return true;
  }
}
