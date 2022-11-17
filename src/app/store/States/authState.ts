export class AuthState {
  auth: any;
  generateOtp: any;
  verifyOTPSuccess: any;
  setPasswordSuccess: any;
  categories: any;
  categoryDetails: any;
  isEditMode: boolean;
  domain: any;
  userDetail: any;
  orgDetails: any;
  entities: any;
  constructor(isEditMode) {
    this.isEditMode = isEditMode;
    this.auth = {};
  }
}
