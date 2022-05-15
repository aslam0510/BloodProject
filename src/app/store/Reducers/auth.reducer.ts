import * as authActions from './../Actions/auth.action';
import { authInitialState } from './../States/auth.state';
import { createReducer, on } from '@ngrx/store';
import { AuthList } from './../../models/authList';

export function AuthReducer(
  state = new AuthList(false),
  action: authActions.Actions
) {
  switch (action.type) {
    case authActions.GET_LOGIN_SUCCESS: {
      // localStorage.setItem('token', action.payload.token);

      return { ...state, auth: action.payload };
    }
    default:
      return state;
  }
}
