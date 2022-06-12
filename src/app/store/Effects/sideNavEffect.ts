import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as SideNavAction from '../../store/Actions/sideNavAction';
import * as api from '../../app-apis';
import { exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class SideNavEffect {
  constructor(private action$: Actions, private http: HttpClient) {}

  getUsersList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_USERS_LIST),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_USERS_LIST'))
          .pipe(
            map((data: any) => new SideNavAction.GetUsersListSuccess(data))
          );
      })
    );
  });

  getUserRole$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_USER_ROLE),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_USER_ROLE'))
          .pipe(map((data: any) => new SideNavAction.GetUserRoleSuccess(data)));
      })
    );
  });

  createUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.ADD_USER),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .post(api.getAPI('ADD_USER'), payload)
          .pipe(map((data: any) => new SideNavAction.AddUserSuccess(data)));
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.DELETE_USER),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .delete(api.getAPI('DELETE_USER' + `?_id=${payload}`))
          .pipe(map((data: any) => new SideNavAction.DeleteUserSuccess(data)));
      })
    );
  });

  getUserentityCategories$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_USER_ENTITY_CATEGORY),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_USER_ENTITY_CATEGORIES'))
          .pipe(
            map(
              (data: any) => new SideNavAction.GetEntityCategoriesSuccess(data)
            )
          );
      })
    );
  });
}
