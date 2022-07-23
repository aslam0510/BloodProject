import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as AuthAction from '../../store/Actions/auth.action';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token = '';
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = data.token;
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  save() {
    if (this.resetPasswordForm.valid) {
      const payload = {
        token: this.token,
        pwd: this.resetPasswordForm.value.password,
        confPwd: this.resetPasswordForm.value.confirmPassword,
      };
      this.store.dispatch(new AuthAction.ForgetPassword(payload));
    }
  }
}
