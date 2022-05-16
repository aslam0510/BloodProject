import * as authActions from './../Actions/auth.action';
import { AuthList } from './../../models/authList';

export function AuthReducer(
  state = new AuthList(false),
  action: authActions.Actions
) {
  switch (action.type) {
    case authActions.GET_LOGIN_SUCCESS: {
      return { ...state, auth: action.payload };
    }
    default:
      return state;
  }
}
