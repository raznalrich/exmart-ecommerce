import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHandlerFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Skip if it's a login request or if no token exists
    if (request.url.includes('/login') || !token) {
      return next.handle(request);
    }

  // Clone the request and add the authorization header
  const authRequest = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If unauthorized, redirect to login
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
