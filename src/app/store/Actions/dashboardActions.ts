export const GET_ORGANIZATION_TYPES = 'GET_ORGANIZATION_TYPE';
export const GET_ORGANIZATION_TYPES_SUCCESS = 'GET_ORGANIZATION_TYPE_SUCCESS';
export const SUBMIT_ORGFORM = 'SUBMIT_ORGFORM';
export const SUBMIT_ORGFORM_SUCCESS = 'SUBMIT_ORGFORM_SUCCESS';
export const SUBMIT_ENTITYFORM = 'SUBMIT_ENTITYFORM';
export const SUBMIT_ENTITYFORM_SUCCESS = 'SUBMIT_ENTITYFORM_SUCCESS';
export const ADD_NEW_ENTITY = 'ADD_NEW_ENTITY';
export const ADD_NEW_ENTITY_SUCCESS = 'ADD_NEW_ENTITY_SUCCESS';
export const GET_ORGANIZATION_DETAILS = 'GET_ORGANIZATION_DETAILS';
export const GET_ORGANIZATION_DETAILS_SUCCESS =
  'GET_ORGANIZATION_DETAILS_SUCCESS';
export const GET_ENTITY_DETAILS = 'GET_ENTITY_DETAILS';
export const GET_ENTITY_DETAILS_SUCCESS = 'GET_ENTITY_DETAILS_SUCCESS';
export const CLEAR_ENTITITES = 'CLEAR_ENTITITES';
export const GET_ENTITY_BYID = 'GET_ENTITY_BYID';
export const GET_ENTITY_BYID_SUCCESS = 'GET_ENTITY_BYID_SUCCESS';
export const GET_ENTITY_CATEGORIES = 'GET_ENTITY_CATEGORIES';
export const GET_ENTITY_CATEGORIES_SUCCESS = 'GET_ENTITY_CATEGORIES_SUCCESS';
export const UPDATE_ORG_INFO = 'UPDATE_ORG_INFO';
export const UPDATE_ORG_INFO_SUCCESS = 'UPDATE_ORG_INFO_SUCCESS';
export const UPDATE_ENTITY_INFO = 'UPDATE_ENTITY_INFO';
export const UPDATE_ENTITY_INFO_SUCCESS = 'UPDATE_ENTITY_INFO_SUCCESS';
export const CREATE_BLOOD_REQUEST = 'CREATE_BLOOD_REQUEST';
export const CREATE_BLOOD_REQUEST_SUCCESS = 'CREATE_BLOOD_REQUEST_SUCCESS';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const GET_DASHBOARD_SUMMARY = 'GET_DASHBOARD_SUMMARY';
export const GET_DASHBOARD_SUMMARY_SUCCESS = 'GET_DASHBOARD_SUMMARY_SUCCESS';
export const GET_ACTIVITIES_BY_DATE = 'GET_ACTIVITIES_BY_DATE';
export const GET_ACTIVITIES_BY_DATE_SUCCESS = 'GET_ACTIVITIES_BY_DATE_SUCCESS';
export class GetOrganizationTypes {
  readonly type = GET_ORGANIZATION_TYPES;
  constructor() {}
}
export class GetOrganizationTypesSuccess {
  readonly type = GET_ORGANIZATION_TYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class SubmitOrgForm {
  readonly type = SUBMIT_ORGFORM;
  constructor(public payload: any) {}
}

export class SubmitOrgFormSuccess {
  readonly type = SUBMIT_ORGFORM_SUCCESS;
  constructor(public payload: any) {}
}

export class SubmitEntityForm {
  readonly type = SUBMIT_ENTITYFORM;
  constructor(public payload: any) {}
}
export class SubmitEntityFormSuccess {
  readonly type = SUBMIT_ENTITYFORM_SUCCESS;
  constructor(public payload: any) {}
}

export class AddNewEntity {
  readonly type = ADD_NEW_ENTITY;
  constructor(public payload: any) {}
}

export class AddNewEntitySuccess {
  readonly type = ADD_NEW_ENTITY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetOrganizationDetails {
  readonly type = GET_ORGANIZATION_DETAILS;
  constructor() {}
}
export class GetOrganizationDetailsSuccess {
  readonly type = GET_ORGANIZATION_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetEntityDetails {
  readonly type = GET_ENTITY_DETAILS;
  constructor() {}
}
export class GetEntityDetailsSuccess {
  readonly type = GET_ENTITY_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}
export class ClearEntities {
  readonly type = CLEAR_ENTITITES;
}
export class GetEntityById {
  readonly type = GET_ENTITY_BYID;
  constructor(public payload: any) {}
}

export class GetEntityByIdSuccess {
  readonly type = GET_ENTITY_BYID_SUCCESS;
  constructor(public payload: any) {}
}

export class GetEntityCategories {
  readonly type = GET_ENTITY_CATEGORIES;
  constructor() {}
}
export class GetEntityCategoriesSuccess {
  readonly type = GET_ENTITY_CATEGORIES_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateOrgInfo {
  readonly type = UPDATE_ORG_INFO;
  constructor(public payload: any) {}
}

export class UpdateOrgInfoSuccess {
  readonly type = UPDATE_ORG_INFO_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateEntityInfo {
  readonly type = UPDATE_ENTITY_INFO;
  constructor(public payload: any) {}
}
export class UpdateEntityInfoSuccess {
  readonly type = UPDATE_ENTITY_INFO_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateBloodReq {
  readonly type = CREATE_BLOOD_REQUEST;
  constructor(public payload: any) {}
}
export class CreateBloodReqSuccess {
  readonly type = CREATE_BLOOD_REQUEST_SUCCESS;
  _SUCCESS;
  constructor(public payload: any) {}
}

export class GetUserDetails {
  readonly type = GET_USER_DETAILS;
}

export class GetUserDetailsSuccess {
  readonly type = GET_USER_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateUserDetails {
  readonly type = UPDATE_USER_DETAILS;
  constructor(public payload: any) {}
}

export class UpdateUserDetailsSuccess {
  readonly type = UPDATE_USER_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}
export class GetDashboardSummary {
  readonly type = GET_DASHBOARD_SUMMARY;
  constructor(public payload: any) {}
}

export class GetDashboardSummarySuccess {
  readonly type = GET_DASHBOARD_SUMMARY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetActivitiesByDate {
  readonly type = GET_ACTIVITIES_BY_DATE;
  constructor(public payload: any) {}
}

export class GetActivitiesByDateSuccess {
  readonly type = GET_ACTIVITIES_BY_DATE_SUCCESS;
  constructor(public payload: any) {}
}
export type Actions =
  | GetOrganizationTypes
  | GetOrganizationTypesSuccess
  | SubmitOrgForm
  | SubmitOrgFormSuccess
  | SubmitEntityForm
  | SubmitEntityFormSuccess
  | AddNewEntity
  | AddNewEntitySuccess
  | GetOrganizationDetails
  | GetOrganizationDetailsSuccess
  | GetEntityDetails
  | GetEntityDetailsSuccess
  | GetEntityById
  | GetEntityByIdSuccess
  | GetEntityCategories
  | GetEntityCategoriesSuccess
  | UpdateEntityInfo
  | UpdateEntityInfoSuccess
  | UpdateEntityInfo
  | UpdateOrgInfoSuccess
  | CreateBloodReq
  | CreateBloodReqSuccess
  | GetUserDetails
  | GetUserDetailsSuccess
  | UpdateUserDetails
  | UpdateUserDetailsSuccess
  | GetDashboardSummary
  | GetDashboardSummarySuccess
  | GetActivitiesByDate
  | GetActivitiesByDateSuccess
  | ClearEntities;
