import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

    if (shouldAddToken(req)) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(newReq);

    }
  return next(req);

  function shouldAddToken(req: HttpRequest<any>): boolean {
    // Define the logic to determine if the token should be added to the request
    // For example:
    // - Exclude specific URLs:
      return !req.url.includes('/api/AuthControllers/Login')


    // - Exclude specific methods:
    //   return req.method !== 'GET';

    // - Combine multiple conditions as needed

  }
};
