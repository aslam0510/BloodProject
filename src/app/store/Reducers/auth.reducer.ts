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
    case authActions.VERIFY_OTP_SUCCESS: {
      return { ...state, verifyOTPSuccess: action.payload };
    }
    case authActions.SET_PASSWORD_SUCCESS: {
      return { ...state, setPasswordSuccess: action.payload };
    }
    default:
      return state;
  }
}
