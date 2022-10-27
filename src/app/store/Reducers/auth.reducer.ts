import * as authActions from './../Actions/auth.action';
import { AuthState } from './../States/authState';

export function AuthReducer(
  state = new AuthState(false),
  action: authActions.Actions
) {
  switch (action.type) {
    case authActions.GET_LOGIN_SUCCESS: {
      return { ...state, auth: action.payload, domain: null };
    }
    case authActions.GENERATE_OTP_SUCCESS: {
      return { ...state, generateOtp: action.payload, domain: null };
    }
    case authActions.VERIFY_OTP_SUCCESS: {
      return { ...state, verifyOTPSuccess: action.payload, domain: null };
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
    case authActions.LOGOUT_SUCCESS: {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      return {
        ...state,
        logout: action.payload,
        auth: null,
        verifyOTPSuccess: null,
      };
    }
    default:
      return state;
  }
}
