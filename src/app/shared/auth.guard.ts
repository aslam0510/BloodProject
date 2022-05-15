import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginSuccess$: Observable<any>;
  loginSuccess: any;
  token: string;
  constructor(private store: Store<AppState>, private rourter: Router) {
    this.loginSuccess$ = this.store.select((state) => state.AuthSlice.auth);
    this.loginSuccess$.subscribe((data) => {
      if (data) {
        this.loginSuccess = data;
      }
    });
    this.token = localStorage.getItem('token');
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (
      (this.token &&
        this.token !== 'null' &&
        this.token !== undefined &&
        this.token !== '') ||
      (this.loginSuccess &&
        this.loginSuccess.code === 200 &&
        this.loginSuccess.status === 'Success')
    ) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.rourter.navigate(['/login']);
      return false;
    }
  }
}
