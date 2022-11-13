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
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload}` : '';
        return this.http
          .get(api.getAPI('GET_USERS_LIST') + id)
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
        const id = payload ? `/${payload.id}` : '';
        return this.http
          .get(
            api.getAPI('GET_BLOOD_COMP_STATUS') + `${id}?start=${payload.date}`
          )
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
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload}` : '';
        return this.http
          .get(api.getAPI('GET_BLOOD_COMP_LIST') + `${id}`)
          .pipe(
            map((data: any) => new SideNavAction.GetBloodCompListSuccess(data))
          );
      })
    );
  });

  getBloodGroupList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_GROUP_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload}` : '';
        return this.http
          .get(api.getAPI('GET_BLOOD_GROUP_LIST') + `${id}`)
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
        const id = payload ? `/${payload.id}` : '';
        return this.http
          .put(
            api.getAPI('UPDATE_BLOOD_COMP_STATUS') + `${id}`,
            payload.payload
          )
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
        const id = payload ? `/${payload.id}` : '';
        return this.http
          .get(
            api.getAPI('GET_BLOOD_AVAILABILITY_STATUS') +
              `${id}?start=${payload.date}`
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
          .get(api.getAPI('GET_BLOOD_REQUEST_STATUS_LIST'))
          .pipe(
            map(
              (data: any) =>
                new SideNavAction.GetBloodReqStatusListSuccess(data)
            )
          );
      })
    );
  });

  getBloodReqList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLOOD_REQUEST_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `/${payload.id}` : '';
        console.log(payload.priortiy, payload.reqSts);
        return this.http
          .get(
            api.getAPI('GET_BLOOD_REQUEST_LIST') +
              `${id}?page=1&size=100&${
                payload.priority
                  ? 'priority=' + payload.priority
                  : 'reqSts=' + payload.reqSts
              }`
          )
          .pipe(
            map((data: any) => new SideNavAction.GetBloodReqListSuccess(data))
          );
      })
    );
  });

  getBldReqById$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_BLD_REQ_BY_ID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_BLD_REQ_BY_ID') + payload)
          .pipe(
            map((data: any) => new SideNavAction.GetBldReqByIdSuccess(data))
          );
      })
    );
  });

  updateBldReq$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.UPDATE_BLOOD_REQUEST_REQ),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_BLOOD_REQUEST_REQ'), payload)
          .pipe(
            map(
              (data: any) =>
                new SideNavAction.UpdateBloodRequestReqSuccess(data)
            )
          );
      })
    );
  });

  updateBldRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.UPDATE_BLOOD_REQUEST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_BLOOD_REQUEST'), payload)
          .pipe(
            map(
              (data: any) => new SideNavAction.UpdateBloodRequestSuccess(data)
            )
          );
      })
    );
  });

  getDonorRepoList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_DONOR_REPO_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        const id = payload ? `${payload.id}` : '';
        return this.http
          .get(
            api.getAPI('GET_DONOR_REPO_LIST') +
              `${id}?page=${payload.size}&size=100&isDonorRepo=true`
          )
          .pipe(
            map((data: any) => new SideNavAction.GetDonorRepoListSuccess(data))
          );
      })
    );
  });

  getDonorDonationList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_DONOR_DONATION_HISTORY_LIST),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        let date = payload.date;
        const id = payload ? `${payload.id}` : '';
        return this.http
          .get(
            api.getAPI('GET_DONOR_DONATION_LIST') +
              `${id}?${
                payload.date && 'date=' + payload.date
              }&isDonorRepo=false&page=1&size=100`
          )
          .pipe(
            map(
              (data: any) => new SideNavAction.GetDonorDonationListSuccess(data)
            )
          );
      })
    );
  });

  getDonorByid$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_DONOR_REPO_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(api.getAPI('GET_DONOR_REPO_BYID') + `?_id=${payload}`)
          .pipe(
            map((data: any) => new SideNavAction.GetDonorRepoByIdSucess(data))
          );
      })
    );
  });

  getDoantionByid$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.GET_DONOR_DONATION_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        console.log(payload, 'donation');

        return this.http
          .get(api.getAPI('GET_DONOR_DONATION_BYID') + `?_id=${payload}`)
          .pipe(
            map(
              (data: any) => new SideNavAction.GetDonorDonationByIdSucess(data)
            )
          );
      })
    );
  });

  updateDonorByid$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.UPDATE_DONOR_REPO_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_DONOR_REPO_BYID'), payload)
          .pipe(
            map(
              (data: any) => new SideNavAction.UpdateDonorRepoByIdSuccess(data)
            )
          );
      })
    );
  });

  updateDonationrByid$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.UPDATE_DONATION_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .put(api.getAPI('UPDATE_DONATION_BYID'), payload)
          .pipe(
            map(
              (data: any) => new SideNavAction.UpdateDonationByIdSuccess(data)
            )
          );
      })
    );
  });

  searchDonorParams$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.SEARCH_DONOR_BY_PARAMETER),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .get(
            api.getAPI('SEARCH_DONOR_BY_PARAMS') +
              `?page=1&size=1&${payload.searchParam}=${payload.searchTerm}`
          )
          .pipe(
            map((data: any) => new SideNavAction.GetDonorRepoListSuccess(data))
          );
      })
    );
  });

  deleteRepoById$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.DELETE_DONOR_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        console.log(payload);

        return this.http
          .delete(api.getAPI('DELETE_DONOR_REPO_BYID') + `?_id=${payload}`)
          .pipe(
            map((data: any) => new SideNavAction.DeleteDonorByIdSuccess(data))
          );
      })
    );
  });

  deleteDonationByID$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SideNavAction.DELETE_DONATION_BYID),
      map((data: any) => data.payload),
      exhaustMap((payload) => {
        return this.http
          .delete(api.getAPI('DELETE_DONATION_BYID') + `?_id=${payload}`)
          .pipe(
            map(
              (data: any) => new SideNavAction.DeleteDonationByIdSuccess(data)
            )
          );
      })
    );
  });
}
