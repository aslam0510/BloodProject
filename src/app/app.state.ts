import { AuthState } from './store/States/auth.state';
import { ActionReducerMap } from '@ngrx/store';
import { CounterState } from './ngrx/Counter.state';
import { counterReducer } from './store/Reducers/couter.reducer';
import { AuthReducer } from './store/Reducers/auth.reducer';

export interface AppState {
  AuthSlice: AuthState;
  CounterSlice: CounterState;
}

export const appReducers: ActionReducerMap<AppState> = {
  CounterSlice: counterReducer,
  AuthSlice: AuthReducer,
};
