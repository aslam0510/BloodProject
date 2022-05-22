import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as AuthAction from '../../store/Actions/auth.action';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginViaOtp',
  templateUrl: './loginViaOtp.component.html',
  styleUrls: ['./loginViaOtp.component.css'],
})
export class LoginViaOtpComponent implements OnInit {
  loginViaOtpForm: FormGroup;
  page = '';
  ref = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<LoginViaOtpComponent>
  ) {
    this.page = data.page;
    this.ref = data.ref;
  }

  ngOnInit() {
    this.loginViaOtpForm = new FormGroup({
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      verifyOtp: new FormControl('', [Validators.required]),
    });
  }

  onLoginViaOtp() {
    if (this.loginViaOtpForm.controls['mobileNumber'].valid) {
      const payload = {
        mob: this.loginViaOtpForm.value.mobileNumber,
      };
      this.store.dispatch(new AuthAction.GenerateOtp(payload));
      this.dialogRef.close(true);
      this.router.navigate(['/login']);
    } else if (this.loginViaOtpForm.controls['verifyOtp'].valid) {
      const payload = {
        ref: this.ref,
        otp: +this.loginViaOtpForm.value.verifyOtp,
      };
      this.store.dispatch(new AuthAction.VerifyOtp(payload));
      this.dialogRef.close();
      this.router.navigate(['/login']);
    }
  }
}
