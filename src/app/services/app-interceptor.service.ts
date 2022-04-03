import { AuthService } from './auth.service';
import { inject } from '@angular/core/testing';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthService);

    let token = req.clone({
      setHeaders: {
        Authorization: 'bearer' + authService.getToken(),
      },
    });
    return next.handle(token);
  }
}
