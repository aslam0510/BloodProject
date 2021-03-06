export const GET_USERS_LIST = 'GET_USERS_LIST';
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const GET_USER_ROLE = 'GET_USER_ROLE';
export const GET_USERS_ROLES_SUCCESS = 'GET_USER_ROLE_SUCCESS';
export const GET_USER_ENTITY_CATEGORY = 'GET_USER_ENTITY_CATEGORY';
export const GET_USER_ENTITY_CATEGORY_SUCCESS =
  'GET_USER_ENTITY_CATEGORY_SUCCESS';
export const GET_BLOOD_COMP_STATUS = 'BLOOD_COMP_STATUS';
export const GET_BLOOD_COMP_STATUS_SUCCESS = 'BLOOD_COMP_STATUS_SUCCESS';
export const GET_BLOOD_COMP_LIST = 'GET_BLOOD_COMP_LIST';
export const GET_BLOOD_COMP_LIST_SUCCESS = 'GET_BLOOD_COMP_LIST_SUCCESS';
export const GET_BLOOD_GROUP_LIST = 'GET_BLOOD_GROUP_LIST';
export const GET_BLOOD_GROUP_LIST_SUCCESS = 'GET_BLOOD_GROUP_LIST_SUCCESS';
export const UPDATE_BLOOD_COMP_STATUS = 'UPDATE_BLOOD_COMP_STATUS';
export const UPDATE_BLOOD_COMP_STATUS_SUCCESS =
  'UPDATE_BLOOD_COMP_STATUS_SUCCESS';
export const GET_BLOOD_AVAILABILITY_STATUS = 'GET_BLOOD_AVAILABILITY_STATUS';
export const GET_BLOOD_AVAILABILITY_STATUS_SUCCESS =
  'GET_BLOOD_AVAILABILITY_STATUS_SUCCESS';
export const GET_BLOOD_REQUEST_STATUS_LIST = 'GET_BLOOD_REQUEST_STATUS_LIST';
export const GET_BLOOD_REQUEST_STATUS_LIST_SUCCESS =
  'GET_BLOOD_REQUEST_STATUS_LIST_SUCCESS';
export const GET_BLOOD_REQUEST_LIST = 'GET_BLOOD_REQUEST_LIST';
export const GET_BLOOD_REQUEST_LIST_SUCCESS = 'GET_BLOOD_REQUEST_LIST_SUCCESS';
export const GET_BLD_REQ_BY_ID = 'GET_BLD_REQ_BY_ID';
export const GET_BLD_REQ_BY_ID_SUCCESS = 'GET_BLD_REQ_BY_ID_SUCCESS';
export const GET_DONOR_REPO_LIST = ' GET_DONOR_REPO_LIST';
export const GET_DONOR_REPO_LIST_SUCCESS = ' GET_DONOR_REPO_LIST_SUCCESS';
export const GET_DONOR_DONATION_HISTORY_LIST =
  'GET_DONOR_DONATION_HISTORY_LIST';
export const GET_DONOR_DONATION_HISTORY_LIST_SUCCESS =
  'GET_DONOR_DONATION_HISTORY_LIST_SUCCESS';
export const UPDATE_BLOOD_REQUEST = 'UPDATE_BLOOD_REQUEST';
export const UPDATE_BLOOD_REQUEST_SUCCESS = 'UPDATE_BLOOD_REQUEST_SUUCESS';
export class GetUsersList {
  readonly type = GET_USERS_LIST;
}

export class GetUsersListSuccess {
  readonly type = GET_USERS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class AddUser {
  readonly type = ADD_USER;
  constructor(public payload: any) {}
}

export class AddUserSuccess {
  readonly type = ADD_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class EditUser {
  readonly type = EDIT_USER;
  constructor(public payload: any) {}
}

export class EditUserSuccess {
  readonly type = EDIT_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteUser {
  readonly type = DELETE_USER;
  constructor(public payload: any) {}
}

export class DeleteUserSuccess {
  readonly type = DELETE_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUserRole {
  readonly type = GET_USER_ROLE;
  constructor(public payload: any) {}
}

export class GetUserRoleSuccess {
  readonly type = GET_USERS_ROLES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetEntityCategories {
  readonly type = GET_USER_ENTITY_CATEGORY;
}

export class GetEntityCategoriesSuccess {
  readonly type = GET_USER_ENTITY_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodCompStatus {
  readonly type = GET_BLOOD_COMP_STATUS;
  constructor(public payload: any) {}
}
export class GetBloodCompStatusSuccess {
  readonly type = GET_BLOOD_COMP_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodCompList {
  readonly type = GET_BLOOD_COMP_LIST;
}
export class GetBloodCompListSuccess {
  readonly type = GET_BLOOD_COMP_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodGroupList {
  readonly type = GET_BLOOD_GROUP_LIST;
}

export class GetBloodGroupListSuccess {
  readonly type = GET_BLOOD_GROUP_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateBloodCompStatus {
  readonly type = UPDATE_BLOOD_COMP_STATUS;
  constructor(public payload: any) {}
}

export class UpdateBloodCompStatusSuccess {
  readonly type = UPDATE_BLOOD_COMP_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodAvailabilityStatus {
  readonly type = GET_BLOOD_AVAILABILITY_STATUS;
  constructor(public payload: any) {}
}

export class GetBloodAvailabilityStatusSuccess {
  readonly type = GET_BLOOD_AVAILABILITY_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodReqStatusList {
  readonly type = GET_BLOOD_REQUEST_STATUS_LIST;
}
export class GetBloodReqStatusListSuccess {
  readonly type = GET_BLOOD_REQUEST_STATUS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBloodReqList {
  readonly type = GET_BLOOD_REQUEST_LIST;
}

export class GetBloodReqListSuccess {
  readonly type = GET_BLOOD_REQUEST_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBldReqById {
  readonly type = GET_BLD_REQ_BY_ID;
  constructor(public payload: any) {}
}

export class GetBldReqByIdSuccess {
  readonly type = GET_BLD_REQ_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}
export class GetDonorRepoList {
  readonly type = GET_DONOR_REPO_LIST;
  // constructor(public payload: any) {}
}

export class GetDonorRepoListSuccess {
  readonly type = GET_DONOR_REPO_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetDonorDonationList {
  readonly type = GET_DONOR_DONATION_HISTORY_LIST;
  constructor(public payload: any) {}
}

export class GetDonorDonationListSuccess {
  readonly type = GET_DONOR_DONATION_HISTORY_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateBloodRequest {
  readonly type = UPDATE_BLOOD_REQUEST;
  constructor(public payload: any) {}
}
export class UpdateBloodRequestSuccess {
  readonly type = UPDATE_BLOOD_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}
export type Action =
  | GetUsersList
  | GetUsersListSuccess
  | AddUser
  | AddUserSuccess
  | EditUser
  | EditUserSuccess
  | DeleteUser
  | DeleteUserSuccess
  | GetUserRole
  | GetUserRoleSuccess
  | GetEntityCategories
  | GetEntityCategoriesSuccess
  | GetBloodCompStatus
  | GetBloodCompStatusSuccess
  | GetBloodCompList
  | GetBloodCompListSuccess
  | GetBloodGroupList
  | GetBloodGroupListSuccess
  | UpdateBloodCompStatus
  | UpdateBloodCompStatusSuccess
  | GetBloodAvailabilityStatus
  | GetBloodAvailabilityStatusSuccess
  | GetBloodReqList
  | GetBloodReqListSuccess
  | GetBloodReqStatusList
  | GetBloodReqStatusListSuccess
  | GetBldReqById
  | GetBldReqByIdSuccess
  | GetDonorDonationList
  | GetDonorDonationListSuccess
  | GetDonorDonationListSuccess
  | GetDonorRepoListSuccess
  | UpdateBloodRequest
  | UpdateBloodRequestSuccess;
