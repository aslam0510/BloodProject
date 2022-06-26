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
    default: {
      return state;
    }
  }
}
