import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  private loaderStatus: Map<String, String>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
    this.loaderStatus = new Map();
  }

  setHttpStatus(inFlight: boolean, httpReq) {
    if (inFlight) {
      this.loaderStatus.set(encodeURI(httpReq.url), '');
      this.requestInFlight$.next(inFlight);
    } else {
      console.log(this.loaderStatus);
      httpReq.url ? this.loaderStatus.delete(httpReq.url) : '';
    }
    this.loaderStatus.size === 0
      ? this.requestInFlight$.next(false)
      : this.requestInFlight$.next(true);
  }

  //clear the request inFlight
  clearHttpRequest() {
    this.loaderStatus.clear();
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  dialogRef: any = null;

  constructor(
    private inject: Injector,
    private status: HttpStatus,
    private store: Store<AppState>,
    private router: Router,
    public dailog: MatDialog
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true, req);
    const token = localStorage.getItem('token');

    if (token) {
      this.status.setHttpStatus(false, req);
      this.router.navigate(['/']);
    } else {
      const authReq = req.clone({
        setHeaders: {
          token: token ? token : '',
          observe: 'response',

          'Access-Control-Allow-Origin': '*',
        },
      });

      return next.handle(authReq).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.status.setHttpStatus(false, event);
          }
        })
      );
    }
  }
}
