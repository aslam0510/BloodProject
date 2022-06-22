export const GET_USERS_LIST = 'GET_USERS_LIST';
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const EDIT_USER = 'EDIT_USER';
export const EIDT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const GET_USER_ROLE = 'GET_USER_ROLE';
export const GET_USERS_ROLES_SUCCESS = 'GET_USER_ROLE_SUCCESS';
export const GET_USER_ENTITY_CATEGORY = 'GET_USER_ENTITY_CATEGORY';
export const GET_USER_ENTITY_CATEGORY_SUCCESS =
  'GET_USER_ENTITY_CATEGORY_SUCCESS';

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
  readonly type = EIDT_USER_SUCCESS;
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
  | GetEntityCategoriesSuccess;
