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
import { AppErrorDialogComponent } from '../Dialogs/appErrorDialog/appErrorDialog.component';

@Injectable()
export class HttpStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  private loaderStatus: Map<String, String>;
  private noInFlight: number;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
    this.loaderStatus = new Map();
    this.noInFlight = 0;
  }

  // setHttpStatus(inFlight: boolean, httpReq) {
  //   if (inFlight) {
  //     console.log(encodeURI(httpReq.url));
  //     this.loaderStatus.set(encodeURI(httpReq.url), '');
  //     this.requestInFlight$.next(inFlight);
  //   } else {
  //     console.log('encded ' + decodeURI(httpReq.url));
  //     this.loaderStatus.delete(decodeURI(httpReq.url));
  //   }

  //   this.loaderStatus.size === 0
  //     ? this.requestInFlight$.next(false)
  //     : this.requestInFlight$.next(true);
  //   console.log(this.loaderStatus.size);
  // }

  setHttpStatus(inFlight: boolean, httpReqs) {
    if (inFlight) {
      this.noInFlight++;
      this.requestInFlight$.next(inFlight);
    } else if (!inFlight && this.noInFlight === 1) {
      this.noInFlight--;
      this.requestInFlight$.next(inFlight);
    } else if (!inFlight && this.noInFlight > 1) {
      this.noInFlight--;
    }
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
    public dialog: MatDialog
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true, req);
    const token = localStorage.getItem('token');
    if (
      !token &&
      req.url
        .toString()
        .trim()
        .toLowerCase()
        .indexOf('/login'.toLowerCase()) !== -1 &&
      req.url
        .toString()
        .trim()
        .toLowerCase()
        .indexOf('/register/organization'.toLowerCase()) !== -1 &&
      req.url
        .toString()
        .trim()
        .toLowerCase()
        .indexOf('/register/entity'.toLowerCase()) !== -1 &&
      req.url
        .toString()
        .trim()
        .toLowerCase()
        .indexOf('/sendOTP'.toLowerCase()) !== -1
    ) {
      this.status.setHttpStatus(false, req);
      this.router.navigate(['/login']);
    } else {
      const authReq = req.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : '',
          observe: 'response',
        },
      });

      return next.handle(authReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.status.setHttpStatus(false, event);
            }
          },
          (err: any) => {
            this.status.setHttpStatus(false, err);
            if ((err.status && err.status === 401) || err.status === 500) {
              this.router.navigate(['/login']);
            } else {
              if (err.error.message) {
                console.log(err);
                const dialogRef = this.dialog.open(AppErrorDialogComponent, {
                  width: '45%',
                  height: 'auto',
                  data: { errors: err.error.message },
                });
                dialogRef.afterClosed().subscribe((result) => {
                  this.dialog.closeAll();
                });
              }
            }
          }
        )
      );
    }
  }
}
