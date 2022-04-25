import * as authActions from './../Actions/auth.action';
import { authInitialState } from './../States/auth.state';
import { createReducer, on } from '@ngrx/store';

// const _authReducer = createReducer(authInitialState,
//   on(authActions.GET_LOGIN_SUCCESS, (state, action) => {
//     return {
//       ...state
//     }
//   })

// );

// export function authReducer(state, action) {
//   return _authReducer(state, action);
// }

export function AuthReducer(
  state = authInitialState,
  action: authActions.Actions
) {
  switch (action.type) {
    case authActions.GET_LOGIN_SUCCESS: {
      return { ...state };
    }
  }
}
