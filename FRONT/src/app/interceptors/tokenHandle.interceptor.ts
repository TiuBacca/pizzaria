import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenHandleInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token =
    sessionStorage.getItem('token') &&
    sessionStorage.getItem('token') != null
        ? sessionStorage.getItem('token')
        : '';
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }
    return next.handle(req);
  }
}
