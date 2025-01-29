import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if the token exists
  }

  getUserRole() : string | undefined {
    // First check localStorage for role
    const localRole = localStorage.getItem('role');
    if (localRole) {
      // Convert to proper case (Admin/User) to match your expectations
      return localRole.charAt(0).toUpperCase() + localRole.slice(1).toLowerCase();
    }
    return undefined;
  }

  // isAdmin(): boolean {
  //   return this.getUserRole() === 'Admin';
  // }

  hasRole(expectedRole: string) : boolean | undefined{
    const userRole = this.getUserRole();
    // Case-insensitive comparison
    if(userRole){
      return userRole.toLowerCase() === expectedRole.toLowerCase();
    }
    return undefined;
  }
}
