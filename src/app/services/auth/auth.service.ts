import { EnvironmentService } from './../../environments/environment.service';
// import { environment } from './../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from '../api-service.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


interface LoginRequestDTO {
  email: string;
}
declare global {
  interface Window {
    env: {
      clientId: string;
      clientSecret: string;
      tenantId: string;
      authority:string;
      redirectUri:string;
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginResponse : any
  token : any
  isLoading:boolean=false;
  errorMessage: string = '';

  phoneNumber: string = '+919746466925';
  name: string = 'username';

  // constructor() { }

// isLoggedIn(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token; // Returns true if the token exists
//   }

// getUserRole() : string | undefined {
//     // First check localStorage for role
//     const localRole = localStorage.getItem('role');
//     if (localRole) {
//       // Convert to proper case (Admin/User) to match your expectations
//       return localRole.charAt(0).toUpperCase() + localRole.slice(1).toLowerCase();
//     }
//     return undefined;
//   }

// hasRole(expectedRole: string) : boolean | undefined{
//     const userRole = this.getUserRole();
//     // Case-insensitive comparison
//     if(userRole){
//       return userRole.toLowerCase() === expectedRole.toLowerCase();
//     }
//     return undefined;
//   }

private isLoggedIn = new BehaviorSubject<boolean>(false);
private readonly destroying$ = new Subject<void>();


constructor(
  private msalService: MsalService,
  private msalBroadcastService: MsalBroadcastService,
  private api : ApiServiceService,
  private router: Router,
  private Environmentservice : EnvironmentService


) {
  this.initializeAuth();
}

async initializeAuth() {
  try {
    console.log("environment variable from authservice: ", this.Environmentservice.clientSecret)
    await this.msalService.initialize().toPromise();  // 🔹 Ensure initialization completes
    console.log('MSAL Initialized Successfully!');
    this.checkLoginStatus();
    await this.handleRedirect(); // 🔹 Wait for redirect handling
  } catch (error) {
    console.error('MSAL Initialization Error:', error);
  }

  this.listenForAuthChanges();
}

private async handleRedirect() {
  try {
    console.log("handleRedirect started...");

    // 1️⃣ Ensure handleRedirectPromise is called before checking accounts
    const res = await this.msalService.instance.handleRedirectPromise();
    console.log("handleRedirectPromise result:", res);

    if (!res) {
      console.log("No redirect response. Checking existing accounts...");
      const accounts = this.msalService.instance.getAllAccounts();
      console.log("Existing accounts:", accounts);

      if (accounts.length > 0) {
        console.log("Using existing account:", accounts[0]);
        this.msalService.instance.setActiveAccount(accounts[0]);
        this.isLoggedIn.next(true);
        this.processLogin(accounts[0].username);
      } else {
        console.log("No accounts found.");
      }
      return;
    }

    // 2️⃣ If res contains an account, use it
    if (res.account) {
      console.log("handleRedirect: Login successful!", res.account);
      this.msalService.instance.setActiveAccount(res.account);
      this.isLoggedIn.next(true);
      this.processLogin(res.account.username);
    } else {
      console.log("handleRedirect: No account in response.");
    }

  } catch (error) {
    console.error("Error handling redirect:", error);
  }
}

private checkLoginStatus() {
  console.log("check login status function started")
  this.isLoggedIn.next(this.msalService.instance.getAllAccounts().length > 0)
  console.log("is loggedIn ", this.isLoggedIn)
}

private listenForAuthChanges() {
  this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this.destroying$)
    )
    .subscribe(() => {
      this.checkLoginStatus();
    });
}

  async login() {
  console.log("Starting login process...");

  await this.msalService.initialize().toPromise();
    this.msalService.loginPopup()
      .subscribe({
        next: (response) => {
          console.log("Login successful:", response);
          this.isLoggedIn.next(true)

          if (response.account) {

            this.msalService.instance.setActiveAccount(response.account);
            localStorage.setItem('userid', response.account.localAccountId);
            localStorage.setItem('name',  response.account.name?? '');
            console.log("user name: ", response.account.username)
            this.processLogin(response.account.username);
          }
        },
        error: (error) => {
          console.error("Login failed:", error);
        }
      });
}

logout() {
  this.msalService.logoutPopup();
  this.isLoggedIn.next(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    localStorage.removeItem('userRole');
    localStorage.clear();
    this.router.navigate(['/login']);
}

 //  Get local token
 isUserLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

//  Get user role from local storage
getUserRole(): string | null {
  return localStorage.getItem('role');
}

destroy() {
  this.destroying$.next(undefined);
  this.destroying$.complete();
}

private processLogin(email: string) {
  console.log('Process login started with email:', email);

  const loginRequest: LoginRequestDTO = { email };

  console.log('Sending login request:', loginRequest);
  this.api.LoginandToken(loginRequest).subscribe({
    next: (res: any) => {
      console.log("Response from login and token", res);
      this.loginResponse = res;
      this.token = res.token;

      try {
        const decoded: any = jwtDecode(this.token);
        console.log('Decoded UserId:', decoded.UserId);
        console.log('Decoded UserName:', decoded.name);
        console.log('Decoded Token', this.token);

        localStorage.setItem('token', this.token);
        localStorage.setItem('userid', decoded.UserId);
        localStorage.setItem('loginTimestamp', new Date().getTime().toString());

        this.authentication(decoded.UserId);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.errorMessage = 'Invalid token received';
      }
    },
    error: (error: HttpErrorResponse) => {
      console.log('Error details:', {
        status: error.status,
        message: error.error?.message,
        error: error
      });

      switch (error.status) {
        case 404:
          console.log('User not found, initiating new user creation...');
          this.addNewUser(email);
          break;

        case 500:
          console.error('Server error:', error.error);
          this.errorMessage = 'Server error occurred. Please try again later.';
          this.addNewUser(email);
          break;

        default:
          console.error('Unexpected error:', error);
          this.errorMessage = 'Login failed. Please try again.';
      }

      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

  authentication(userId: any): void {
    this.api.IsAdmin(userId).subscribe({
      next: (isAdmin) => {
        if (isAdmin) {
          localStorage.setItem("role", "Admin");
          this.router.navigate(['/admin/admindashboard']);
        } else {
          localStorage.setItem('userId', userId);
          localStorage.setItem("role", "User");
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
        localStorage.setItem('userId', userId);
        localStorage.setItem("role", "User");
        this.router.navigate(['/home']);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

   addNewUser(email : string){

    this.name = localStorage.getItem('name')?? '';
    this.api.addNewUser(email, this.name, this.phoneNumber).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.processLogin(email)
      },
      (error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user. Please try again.');
      }
    );
   }


   get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

}
