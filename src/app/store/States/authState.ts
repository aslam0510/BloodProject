export class AuthState {
  auth: any;
  generateOtp: any;
  verifyOTPSuccess: any;
  setPasswordSuccess: any;
  categories: any;
  categoryDetails: any;
  isEditMode: boolean;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
