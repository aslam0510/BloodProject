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
export const GET_ENTITY_BYID = 'GET_ENTITY_BYID';
export const GET_ENTITY_BYID_SUCCESS = 'GET_ENTITY_BYID_SUCCESS';
export const GET_ENTITY_CATEGORIES = 'GET_ENTITY_CATEGORIES';
export const GET_ENTITY_CATEGORIES_SUCCESS = 'GET_ENTITY_CATEGORIES_SUCCESS';
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

export class GetEntityById {
  readonly type = GET_ENTITY_BYID;
  constructor(public payload: string) {}
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
  | GetEntityCategoriesSuccess;
