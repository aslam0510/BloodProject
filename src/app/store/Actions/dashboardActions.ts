export const GET_ORGANIZATION_TYPES = 'GET_ORGANIZATION_TYPE';
export const GET_ORGANIZATION_TYPES_SUCCESS = 'GET_ORGANIZATION_TYPE_SUCCESS';
export const SUBMIT_ORGFORM = 'SUBMIT_ORGFORM';
export const SUBMIT_ORGFORM_SUCCESS = 'SUBMIT_ORGFORM_SUCCESS';

export class GetOrganizationTypes {
  readonly type = GET_ORGANIZATION_TYPES;
  constructor() {}
}

export class GetOrganizationTypesSuccess {
  readonly type = GET_ORGANIZATION_TYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class submitOrgForm {
  readonly type = SUBMIT_ORGFORM;
  constructor(public payload: any) {}
}

export class submitOrgFormSuccess {
  readonly type = SUBMIT_ORGFORM_SUCCESS;
  constructor(public payload: any) {}
}
export type Actions =
  | GetOrganizationTypes
  | GetOrganizationTypesSuccess
  | submitOrgForm
  | submitOrgFormSuccess;
