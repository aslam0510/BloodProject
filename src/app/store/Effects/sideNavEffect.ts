import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as SideNavAction from '../../store/Actions/sideNavAction';
import * as api from '../../app-apis';
import { exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class SideNavEffect {
  constructor(private action$: Actions, private http: HttpClient) {}

  // UserManagement page
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
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(
            api.getAPI('GET_USER_ROLE') +
              `?roleCategory=system&roleType=${payload}`
          )
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
        console.log(payload);

        return this.http
          .delete(api.getAPI('DELETE_USER') + `?_id=${payload}`)
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

  editUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.EDIT_USER),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('EDIT_USER'), payload)
          .pipe(map((data: any) => new SideNavAction.EditUserSuccess(data)));
      })
    );
  });

  //ALl Blood Availability page effects
  getBloodCompStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_COMP_STATUS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_BLOOD_COMP_STATUS') + `?start=${payload}`)
          .pipe(
            map(
              (data: any) => new SideNavAction.GetBloodCompStatusSuccess(data)
            )
          );
      })
    );
  });

  getBloodCompList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_COMP_LIST),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_BLOOD_COMP_LIST'))
          .pipe(
            map((data: any) => new SideNavAction.GetBloodCompListSuccess(data))
          );
      })
    );
  });

  getBloodGroupList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_GROUP_LIST),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_BLOOD_GROUP_LIST'))
          .pipe(
            map((data: any) => new SideNavAction.GetBloodGroupListSuccess(data))
          );
      })
    );
  });

  UpdateBloodCompStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.UPDATE_BLOOD_COMP_STATUS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_BLOOD_COMP_STATUS'), payload)
          .pipe(
            map(
              (data: any) =>
                new SideNavAction.UpdateBloodCompStatusSuccess(data)
            )
          );
      })
    );
  });

  getBloodAvailabilityStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_AVAILABILITY_STATUS),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(
            api.getAPI('GET_BLOOD_AVAILABILITY_STATUS') + `?start=${payload}`
          )
          .pipe(
            map(
              (data: any) =>
                new SideNavAction.GetBloodAvailabilityStatusSuccess(data)
            )
          );
      })
    );
  });

  getBloodReqStatusList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_REQUEST_STATUS_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_BLOOD_REQUEST_STATUS_LIST') + payload)
          .pipe(
            map(
              (data: any) =>
                new SideNavAction.GetBloodReqStatusListSuccess(data)
            )
          );
      })
    );
  });

  getBloodReqList = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_REQUEST_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(
            api.getAPI('GET_BLOOD_REQUEST_LIST') +
              `?page=1&size=100&priority=1&reqSts=1`
          )
          .pipe(
            map((data: any) => new SideNavAction.GetBloodReqListSuccess(data))
          );
      })
    );
  });

  getBldReqById = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLD_REQ_BY_ID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        console.log(payload);

        return this.http
          .get(
            api.getAPI('GET_BLD_REQ_BY_ID') +
              `?id=${payload.id}&reqStatusId=${payload.reqStatusId}`
          )
          .pipe(
            map((data: any) => new SideNavAction.GetBldReqByIdSuccess(data))
          );
      })
    );
  });
}
