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
      return {
        ...state,
        entititiesDetails: action.payload,
        organizationDetails: null,
        userDetails: null,
      };
    }
    case dashboardActions.GET_ORGANIZATION_DETAILS_SUCCESS: {
      return {
        ...state,
        organizationDetails: action.payload,
        entititiesDetails: null,
      };
    }
    case dashboardActions.GET_ENTITY_CATEGORIES_SUCCESS: {
      return { ...state, entityCategories: action.payload };
    }
    case dashboardActions.GET_ENTITY_BYID_SUCCESS: {
      return { ...state, entityById: action.payload };
    }
    case dashboardActions.UPDATE_ENTITY_INFO_SUCCESS: {
      return { ...state, updateEntityInfo: action.payload };
    }
    case dashboardActions.UPDATE_ORG_INFO_SUCCESS: {
      return { ...state, updateOrgInfo: action.payload };
    }
    case dashboardActions.CREATE_BLOOD_REQUEST_SUCCESS: {
      return { ...state, createBloodReq: action.payload };
    }
    case dashboardActions.GET_USER_DETAILS_SUCCESS: {
      return { ...state, userDetails: action.payload, entititiesDetails: null };
    }
    case dashboardActions.GET_ACTIVITIES_BY_DATE_SUCCESS: {
      return { ...state, activityDetailsByDate: action.payload };
    }
    case dashboardActions.CLEAR_ENTITITES: {
      return { ...state, entititiesDetails: null };
    }
    case dashboardActions.GET_DASHBOARD_SUMMARY_SUCCESS: {
      const data = action.payload.data;
      return {
        ...state,
        bloodAvailable: data.bloodAvailable,
        bldRequestStatus: data.bldRequestStatus,
        activityDetails: data.activityDetails,
        entititiesDetails: null,
      };
    }
    default:
      return state;
  }
}
