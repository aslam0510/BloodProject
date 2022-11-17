import { Router } from '@angular/router';
import * as auth from './../Actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as api from '../../app-apis';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GET_LOGIN),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        let domainId = localStorage.getItem('domainId')
          ? localStorage.getItem('domainId')
          : '';
        let acckey = localStorage.getItem('acckey')
          ? localStorage.getItem('acckey')
          : '';
        return this.http
          .post(api.getAPI('GET_LOGIN'), payload, {
            headers: {
              domainId,
              acckey,
            },
          })
          .pipe(map((data: any) => new auth.GetLoginSuccess(data)));
      })
    );
  });

  generateOTP$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GENERATE_OTP),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('GENERATE_OTP'), payload)
          .pipe(map((data: any) => new auth.GenerateOtpSuccess(data)));
      })
    );
  });

  verifyOTP$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.VERIFY_OTP),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('VERIFY_OTP'), payload)
          .pipe(map((data: any) => new auth.VerifyOtpSuccess(data)));
      })
    );
  });

  setPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.SET_PASSWORD),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('SET_PASSWORD'), payload)
          .pipe(map((data: any) => new auth.SetPasswordSuccess(data)));
      })
    );
  });

  GetAllCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GET_ALL_CATEGORIES),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ALL_CATEGORIES'))
          .pipe(map((data: any) => new auth.GetAllCategoriesSuccess(data)));
      })
    );
  });

  GetCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GET_CATEGORY),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_CATEGORY') + `?categoryName=${payload}`)
          .pipe(map((data: any) => new auth.GetCategorySuccess(data)));
      })
    );
  });

  ForgetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.FORGET_PASSWORD),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('FORGET_PASSWORD'), payload)
          .pipe(map((data: any) => new auth.ForgetPasswordSuccess(data)));
      })
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.RESET_PASSWORD),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('RESET_PASSWORD'), payload)
          .pipe(map((data: any) => new auth.ResetPasswordSuccess(data)));
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.LOGOUT),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http.post(api.getAPI('LOGOUT'), payload).pipe(
          tap(() => this.router.navigate(['/login'])),
          map((data: any) => new auth.LogoutSuccess(data))
        );
      })
    );
  });

  domain$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GET_DOMAIN),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('GET_DOMAIN'), payload)
          .pipe(map((data: any) => new auth.GetDomainSuccess(data)));
      })
    );
  });

  LoginEntityDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.LOGIN_ENTITIES),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ENTITY_DETAILS'))
          .pipe(map((data) => new auth.LoginEntitiesDetailsSuccess(data)));
      })
    );
  });

  LoginOrganizationDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.LOGIN_ORG_DETAILS),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ORANIZATION_DETAILS'))
          .pipe(map((data) => new auth.loginOrgDetailsSuccess(data)));
      })
    );
  });

  loginUserDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.LOGIN_USER_DETAILS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_USER_DETAILS'))
          .pipe(map((data) => new auth.loginUserDetailSuccess(data)));
      })
    );
  });
}
