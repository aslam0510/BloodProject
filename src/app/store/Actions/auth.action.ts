export const GET_LOGIN = 'GET_LOGIN';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GENERATE_OTP = 'GENERATE_OTP';
export const GENERATE_OTP_SUCCESS = 'GENERATE_OTP_SUCCESS';
export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';

export class GetLogin {
  readonly type = GET_LOGIN;
  constructor(public payload: any) {}
}

export class GetLoginSuccess {
  readonly type = GET_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class GenerateOtp {
  readonly type = GENERATE_OTP;
  constructor(public payload: any) {}
}

export class GenerateOtpSuccess {
  readonly type = GENERATE_OTP_SUCCESS;
  constructor(public payload: any) {}
}

export class VerifyOtp {
  readonly type = VERIFY_OTP;
  constructor(public payload: any) {}
}

export class VerifyOtpSuccess {
  readonly type = VERIFY_OTP_SUCCESS;
  constructor(public payload: any) {}
}

export class SetPassword {
  readonly type = SET_PASSWORD;
  constructor(public payload: any) {}
}

export class SetPasswordSuccess {
  readonly type = SET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAllCategories {
  readonly type = GET_ALL_CATEGORIES;
}
export class GetAllCategoriesSuccess {
  readonly type = GET_ALL_CATEGORIES_SUCCESS;
  constructor(public payload: any) {}
}
export type Actions =
  | GetLogin
  | GetLoginSuccess
  | GenerateOtp
  | GenerateOtpSuccess
  | VerifyOtp
  | VerifyOtpSuccess
  | SetPassword
  | SetPasswordSuccess
  | GetAllCategories
  | GetAllCategoriesSuccess;
