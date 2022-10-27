export class AuthState {
  auth: any;
  generateOtp: any;
  verifyOTPSuccess: any;
  setPasswordSuccess: any;
  categories: any;
  categoryDetails: any;
  isEditMode: boolean;
  domain: any;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
