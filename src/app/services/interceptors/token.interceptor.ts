import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

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
      return !req.url.includes('/api/AuthControllers/Login')
  }
};
