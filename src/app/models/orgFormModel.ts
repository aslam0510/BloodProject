export interface OrgFormModel {
  orgid: string;
  name: string;
  type: string;
  email: string;
  contact: string;
  addr: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  location: string;
  regno: string;
  regcouncil: string;
  regyear: string;
  docs: Array<any>;
  _id: string;
  crtat: string;
}

export interface OrgFormField {
  fieldName: string;
  fieldType: string;
  inputType: string;
  key: string;
  mandatory: boolean;
  values: string[];
}
