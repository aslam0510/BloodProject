export const GET_LOGIN = 'GET_LOGIN';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GENERATE_OTP = 'GENERATE_OTP';
export const GENERATE_OTP_SUCCESS = 'GENERATE_OTP_SUCCESS';
export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const CLEAR_VERIFY_OTP = 'CLEAR_VERIFY_OTP';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const GET_DOMAIN = 'GET_DOMAIN';
export const GET_DOMAIN_SUCCESS = 'GET_DOMAIN_SUCCESS';
export const LOGIN_ENTITIES = 'LOGIN_ENTITIES';
export const LOGIN_ENTITIES_SUCCESS = 'LOGIN_ENTITIES_SUCCESS';
export const LOGIN_ORG_DETAILS = 'LOGIN_ORG_DETAILS';
export const LOGIN_ORG_DETAILS_SUCCESS = 'LOGIN_ORG_DETAILS_SUCCESS';
export const LOGIN_USER_DETAILS = 'LOGIN_USER_DETAILS';
export const LOGIN_USER_DETAILS_SUCCESS = 'LOGIN_USER_DETAILS_SUCCESS';
export const RESEND_OTP = 'RESEND_OTP';
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS';
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
export class ClearVerifyOtp {
  readonly type = CLEAR_VERIFY_OTP;
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

export class GetCategory {
  readonly type = GET_CATEGORY;
  constructor(public payload: string) {}
}

export class GetCategorySuccess {
  readonly type = GET_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class ForgetPassword {
  readonly type = FORGET_PASSWORD;
  constructor(public payload: any) {}
}

export class ForgetPasswordSuccess {
  readonly type = FORGET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetPassword {
  readonly type = RESET_PASSWORD;
  constructor(public payload: any) {}
}

export class ResetPasswordSuccess {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class Logout {
  readonly type = LOGOUT;
  constructor(public payload: any) {}
}

export class LogoutSuccess {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload: any) {}
}
export class GetDomain {
  readonly type = GET_DOMAIN;
  constructor(public payload: any) {}
}
export class GetDomainSuccess {
  readonly type = GET_DOMAIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginEntitiesDetails {
  readonly type = LOGIN_ENTITIES;
  constructor(public payload: any) {}
}
export class LoginEntitiesDetailsSuccess {
  readonly type = LOGIN_ENTITIES_SUCCESS;
  constructor(public payload: any) {}
}
export class loginOrgDetails {
  readonly type = LOGIN_ORG_DETAILS;
}
export class loginOrgDetailsSuccess {
  readonly type = LOGIN_ORG_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}
export class loginUserDetails {
  readonly type = LOGIN_USER_DETAILS;
}
export class loginUserDetailSuccess {
  readonly type = LOGIN_USER_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}
export class ResendOtp {
  readonly type = RESEND_OTP;
  constructor(public payload: any) {}
}

export class ResendOtpSuccess {
  readonly type = RESEND_OTP_SUCCESS;
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
  | GetAllCategoriesSuccess
  | GetCategory
  | GetCategorySuccess
  | ForgetPassword
  | ForgetPasswordSuccess
  | ResetPassword
  | ResetPasswordSuccess
  | Logout
  | LogoutSuccess
  | GetDomain
  | GetDomainSuccess
  | ClearVerifyOtp
  | LoginEntitiesDetails
  | LoginEntitiesDetailsSuccess
  | loginOrgDetails
  | loginOrgDetailsSuccess
  | loginUserDetailSuccess
  | loginUserDetails
  | ResendOtp
  | ResendOtpSuccess;
