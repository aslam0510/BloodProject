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
        const id = payload.id ? `/${payload.id}` : '';
        const entId = payload.entId ? `?entId=${payload.entId}` : '';
        return this.http
          .get(api.getAPI('GET_ENTITY_BYID') + `${id}${entId}`)
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

  UpdateOrgInfo$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.UPDATE_ORG_INFO),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_ORG_INFO'), payload)
          .pipe(map((data) => new dashboardActions.UpdateOrgInfoSuccess(data)));
      })
    );
  });

  UpdateEntityInfo$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.UPDATE_ENTITY_INFO),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload.id ? `/${payload.id}` : '';
        return this.http
          .put(api.getAPI('UPDATE_ENTITY_INFO') + id, payload.formData)
          .pipe(
            map((data) => new dashboardActions.UpdateEntityInfoSuccess(data))
          );
      })
    );
  });

  createBloodRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.CREATE_BLOOD_REQUEST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload.id ? `/${payload.id}` : '';
        return this.http
          .post(api.getAPI('CREATE_BLOOD_REQUEST') + id, payload.formData)
          .pipe(
            map((data) => new dashboardActions.CreateBloodReqSuccess(data))
          );
      })
    );
  });

  getUserDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_USER_DETAILS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_USER_DETAILS'))
          .pipe(
            map((data) => new dashboardActions.GetUserDetailsSuccess(data))
          );
      })
    );
  });

  updateUserDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.UPDATE_USER_DETAILS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_USER_DETAILS'), payload)
          .pipe(
            map((data) => new dashboardActions.UpdateUserDetailsSuccess(data))
          );
      })
    );
  });

  dashboardSummary$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_DASHBOARD_SUMMARY),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload}` : '';
        return this.http
          .get(api.getAPI('GET_DASHBOARD_SUMMARY') + id)
          .pipe(
            map((data) => new dashboardActions.GetDashboardSummarySuccess(data))
          );
      })
    );
  });

  getActivitesBydate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(dashboardActions.GET_ACTIVITIES_BY_DATE),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload.id}` : '';
        return this.http
          .get(
            payload
              ? api.getAPI('GET_ACTIVITIES_BY_DATE') +
                  `${id}?start=${payload.date}`
              : api.getAPI('GET_ACTIVITIES_BY_DATE')
          )
          .pipe(
            map((data) => new dashboardActions.GetActivitiesByDateSuccess(data))
          );
      })
    );
  });
}
