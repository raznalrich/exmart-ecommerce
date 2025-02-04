import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
      return false;
    }

    console.log('AuthGuard: Access granted.');
    return true;
  }
}
