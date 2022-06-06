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
    case dashboardActions.ADD_NEW_ENTITY_SUCCESS: {
      const data = action.payload.data;
      return { ...state, addNewEntity: data };
    }
    case dashboardActions.GET_ENTITY_DETAILS_SUCCESS: {
      return { ...state, entititiesDetails: action.payload };
    }
    case dashboardActions.GET_ORGANIZATION_DETAILS_SUCCESS: {
      return { ...state, organizationDetails: action.payload };
    }
    case dashboardActions.GET_ENTITY_CATEGORIES_SUCCESS: {
      return { ...state, entityCategories: action.payload };
    }
    default:
      return state;
  }
}
