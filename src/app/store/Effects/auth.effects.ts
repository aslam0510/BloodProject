import * as auth from './../Actions/auth.action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as api from '../../app-apis';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private http: HttpClient) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth.GET_LOGIN),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('GET_LOGIN'), payload)
          .pipe(map((data: any) => new auth.GetLoginSuccess(data)));
      })
    );
  });

  generate$ = createEffect(() => {
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
}
