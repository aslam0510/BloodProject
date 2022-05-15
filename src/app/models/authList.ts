export class AuthList {
  auth: any;
  isEditMode: boolean;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
