import * as authActions from './../Actions/auth.action';
import { AuthState } from './../States/authState';
export function AuthReducer(
  state = new AuthState(false),
  action: authActions.Actions
) {
  switch (action.type) {
    case authActions.GET_LOGIN_SUCCESS: {
      return { ...state, auth: action.payload };
    }
    case authActions.GENERATE_OTP_SUCCESS: {
      return { ...state, generateOtp: action.payload };
    }
    case authActions.CLEAR_VERIFY_OTP: {
      return { ...state, verifyOTPSuccess: null, domain: null, auth: null };
    }
    case authActions.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        verifyOTPSuccess: action.payload,
      };
    }
    case authActions.SET_PASSWORD_SUCCESS: {
      return { ...state, setPasswordSuccess: action.payload };
    }
    case authActions.GET_ALL_CATEGORIES_SUCCESS: {
      return { ...state, categories: action.payload };
    }
    case authActions.GET_CATEGORY_SUCCESS: {
      return { ...state, categoryDetails: action.payload };
    }
    case authActions.GET_DOMAIN_SUCCESS: {
      return { ...state, domain: action.payload };
    }
    case authActions.LOGIN_USER_DETAILS_SUCCESS: {
      return { ...state, userDetail: action.payload };
    }
    case authActions.LOGIN_ORG_DETAILS_SUCCESS: {
      return { ...state, orgDetails: action.payload };
    }
    case authActions.LOGIN_ENTITIES_SUCCESS: {
      return { ...state, entities: action.payload };
    }
    case authActions.LOGOUT_SUCCESS: {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      return {
        ...state,
        logout: action.payload,
        auth: null,
        verifyOTPSuccess: null,
        entities: null,
        orgDetails: null,
        userDetail: null,
      };
    }
    default:
      return state;
  }
}
