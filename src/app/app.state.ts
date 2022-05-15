import { ActionReducerMap } from '@ngrx/store';
import { CounterState } from './ngrx/Counter.state';
import { counterReducer } from './store/Reducers/couter.reducer';
import { AuthReducer } from './store/Reducers/auth.reducer';
import { AuthList } from './models/authList';

export interface AppState {
  CounterSlice: CounterState;
  AuthSlice: AuthList;
}

export const appReducers: ActionReducerMap<AppState> = {
  CounterSlice: counterReducer,
  AuthSlice: AuthReducer,
};
