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
    default:
      return state;
  }
}
