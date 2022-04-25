export const GET_LOGIN = 'GET_LOGIN';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';

export class GetLogin {
  readonly type = GET_LOGIN;
  constructor(public payload: any) {}
}

export class GetLoginSuccess {
  readonly type = GET_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions = GetLogin | GetLoginSuccess;
