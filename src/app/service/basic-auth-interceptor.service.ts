import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (!req.url.endsWith('/api/login') && localStorage.getItem('email') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          'Content-type':'application/json',
          // 'Access-Control-Allow-Origin':'*',
          // 'Access-Control-Allow-Header':'Access-Control-Allow-Headers, Origin,Accept,x-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Header',
          // 'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT,PATCH',
          'Authorization': localStorage.getItem('token')
        }
      })
    }

    return next.handle(req);

  }
}
