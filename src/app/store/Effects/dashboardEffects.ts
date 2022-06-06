import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dashboardActions from '../Actions/dashboardActions';
import { map, exhaustMap } from 'rxjs/operators';
import * as api from '../../app-apis';

@Injectable()
export class DashboardEffect {
  constructor(private action$: Actions, private http: HttpClient) {}

  getOrgTypes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ORGANIZATION_TYPES),
      exhaustMap(() => {
        return this.http
          .get(api.getAPI('GET_ORG_TYPES'))
          .pipe(
            map(
              (data) => new dashboardActions.GetOrganizationTypesSuccess(data)
            )
          );
      })
    );
  });

  submitOrgForm$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.SUBMIT_ORGFORM),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('SUBMIT_ORGFORM'), payload)
          .pipe(map((data) => new dashboardActions.SubmitOrgFormSuccess(data)));
      })
    );
  });

  AddNewEntity$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.ADD_NEW_ENTITY),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('ADD_NEW_ENTITY'), payload)
          .pipe(map((data) => new dashboardActions.AddNewEntitySuccess(data)));
      })
    );
  });

  GetOrganizationDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ORGANIZATION_DETAILS),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ORANIZATION_DETAILS'))
          .pipe(
            map(
              (data) => new dashboardActions.GetOrganizationDetailsSuccess(data)
            )
          );
      })
    );
  });

  GetEntityDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ENTITY_DETAILS),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ENTITY_DETAILS'))
          .pipe(
            map((data) => new dashboardActions.GetEntityDetailsSuccess(data))
          );
      })
    );
  });

  GetEntityById$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ENTITY_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ENTITY_BYID') + `?entId=${payload}`)
          .pipe(map((data) => new dashboardActions.GetEntityByIdSuccess(data)));
      })
    );
  });

  GetEntityCategories$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ENTITY_CATEGORIES),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_ENTITY_CATEGORIES'))
          .pipe(
            map((data) => new dashboardActions.GetEntityCategoriesSuccess(data))
          );
      })
    );
  });
}
