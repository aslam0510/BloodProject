export const GET_ORGANIZATION_TYPES = 'GET_ORGANIZATION_TYPE';
export const GET_ORGANIZATION_TYPES_SUCCESS = 'GET_ORGANIZATION_TYPE_SUCCESS';
export const SUBMIT_ORGFORM = 'SUBMIT_ORGFORM';
export const SUBMIT_ORGFORM_SUCCESS = 'SUBMIT_ORGFORM_SUCCESS';
export const SUBMIT_ENTITYFORM = 'SUBMIT_ENTITYFORM';
export const SUBMIT_ENTITYFORM_SUCCESS = 'SUBMIT_ENTITYFORM_SUCCESS';

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
export type Actions =
  | GetOrganizationTypes
  | GetOrganizationTypesSuccess
  | SubmitOrgForm
  | SubmitOrgFormSuccess
  | SubmitEntityForm
  | SubmitEntityFormSuccess;
