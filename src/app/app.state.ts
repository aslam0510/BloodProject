import { ActionReducerMap } from '@ngrx/store';
import { CounterState } from './ngrx/Counter.state';
import { counterReducer } from './store/Reducers/couter.reducer';
import { AuthReducer } from './store/Reducers/auth.reducer';

import { DashboardState } from './store/States/dashboardState';
import { dashboardReducer } from './store/Reducers/dashboardReducer';
import { AuthState } from './store/States/authState';
import { SideNavState } from './store/States/sideNavState';
import { SideNavReducer } from './store/Reducers/sideNavReducer';

export interface AppState {
  CounterSlice: CounterState;
  AuthSlice: AuthState;
  DashboardSlice: DashboardState;
  SidNavSlice: SideNavState;
}

export const appReducers: ActionReducerMap<AppState> = {
  CounterSlice: counterReducer,
  AuthSlice: AuthReducer,
  DashboardSlice: dashboardReducer,
  SidNavSlice: SideNavReducer,
};
