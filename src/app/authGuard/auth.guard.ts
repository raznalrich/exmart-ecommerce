import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      console.log('AuthGuard: User not logged in. Redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
    console.log('AuthGuard: User is logged in. Access granted.');
    return true;
  }
}
