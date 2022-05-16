import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './../States/dashboardState';

const getDashboardState =
  createFeatureSelector<DashboardState>('DashboardSlice');

export const getOrgTypes = createSelector(getDashboardState, (state) => {
  return state.orgTypes;
});
