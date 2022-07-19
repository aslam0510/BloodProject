import * as SideNavActions from '../Actions/sideNavAction';
import { SideNavState } from '../States/sideNavState';

export function SideNavReducer(
  state = new SideNavState(),
  action: SideNavActions.Action
) {
  switch (action.type) {
    case SideNavActions.GET_USERS_LIST_SUCCESS: {
      return { ...state, usersList: action.payload };
    }
    case SideNavActions.ADD_USER_SUCCESS: {
      return { ...state, addUser: action.payload };
    }
    case SideNavActions.EDIT_USER_SUCCESS: {
      return { ...state, editUser: action.payload };
    }
    case SideNavActions.DELETE_USER_SUCCESS: {
      return { ...state, deleteUser: action.payload };
    }
    case SideNavActions.GET_USERS_ROLES_SUCCESS: {
      return { ...state, userRole: action.payload };
    }
    case SideNavActions.GET_USER_ENTITY_CATEGORY_SUCCESS: {
      return { ...state, userEntityCategories: action.payload };
    }
    case SideNavActions.GET_BLOOD_COMP_STATUS_SUCCESS: {
      return { ...state, bloodCompStatus: action.payload };
    }
    case SideNavActions.GET_BLOOD_COMP_LIST_SUCCESS: {
      return { ...state, bloodCompList: action.payload };
    }
    case SideNavActions.GET_BLOOD_GROUP_LIST_SUCCESS: {
      return { ...state, bloodGroupTypes: action.payload };
    }
    case SideNavActions.GET_BLOOD_AVAILABILITY_STATUS_SUCCESS: {
      return { ...state, bloodAvailabilityStatus: action.payload };
    }
    case SideNavActions.GET_BLOOD_REQUEST_LIST_SUCCESS: {
      return { ...state, bloodReqList: action.payload };
    }
    case SideNavActions.GET_BLOOD_REQUEST_STATUS_LIST_SUCCESS: {
      return { ...state, bloodReqStatus: action.payload };
    }
    case SideNavActions.GET_BLD_REQ_BY_ID_SUCCESS: {
      return { ...state, bloodReqDetail: action.payload };
    }
    case SideNavActions.GET_DONOR_DONATION_HISTORY_LIST_SUCCESS: {
      return { ...state, donorDonationHistory: action.payload };
    }
    case SideNavActions.GET_DONOR_REPO_LIST_SUCCESS: {
      return { ...state, donorRepoList: action.payload };
    }
    default: {
      return state;
    }
  }
}
