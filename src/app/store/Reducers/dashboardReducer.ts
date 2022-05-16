import * as dashboardActions from '../Actions/dashboardActions';
import { DashboardState } from '../States/dashboardState';

export function dashboardReducer(
  state = new DashboardState(),
  action: dashboardActions.Actions
) {
  switch (action.type) {
    case dashboardActions.GET_ORGANIZATION_TYPES_SUCCESS: {
      const data = action.payload.data;
      return { ...state, orgTypes: data };
    }
    case dashboardActions.SUBMIT_ORGFORM_SUCCESS: {
      const data = action.payload.data;
      return { ...state, orgForm: data };
    }
    case dashboardActions.SUBMIT_ENTITYFORM_SUCCESS: {
      const data = action.payload.data;
      return { ...state, entityForm: data };
    }
    default:
      return state;
  }
}
