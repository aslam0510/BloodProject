export class AuthState {
  auth: any;
  generateOtp: any;
  verifyOTPSuccess: any;
  setPasswordSuccess: any;
  categories: any;
  isEditMode: boolean;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
