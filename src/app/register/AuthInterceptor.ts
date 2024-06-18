import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './AuthService';


  export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const token = authService.getToken();
  
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`)
      });
      return next(clonedReq);
    }
  
    return next(req);
  };