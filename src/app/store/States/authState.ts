export class AuthState {
  auth: any;
  generateOtp: any;
  isEditMode: boolean;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
