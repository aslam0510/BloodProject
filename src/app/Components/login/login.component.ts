import * as AuthAction from './../../store/Actions/auth.action';
import { Store, ActionsSubject } from '@ngrx/store';
import { ForgotDialogComponent } from './../../Dialogs/forgot-dialog/forgot-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import * as Forge from 'node-forge';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';
import { OrgFormModel } from './../../models/orgFormModel';
import { LoginViaOtpComponent } from './../../Dialogs/loginViaOtp/loginViaOtp.component';
import { helpers } from 'chart.js';
import { SetPasswordDialogComponent } from './../../Dialogs/setPasswordDialog/setPasswordDialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { publicKey, privateKey } from 'src/app/config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginSuccess$: Observable<any>;
  loginSuccess: any;
  loginForm: FormGroup;
  loginErrors$: Observable<any>;
  loginErrors: any;
  verifyOTPSuccess$: Observable<any>;
  verfiyOTPSuccess: any;
  verifyOTPSuccessSub: Subscription;
  ref = '';
  showVerify: boolean;
  hide = true;
  actionSubcription: Subscription;
  showPhnNumber: boolean = false;
  showOtp: boolean = false;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private actionsSubj: ActionsSubject
  ) {
    this.actionSubcription = this.actionsSubj.subscribe((data) => {
      this.handleActionSubscription(data);
    });
    this.loginSuccess$ = this.store.select((state) => state.AuthSlice.auth);
    this.verifyOTPSuccess$ = this.store.select(
      (state) => state.AuthSlice.verifyOTPSuccess
    );

    this.loginErrors = [];
    this.showVerify = true;
  }
  handleActionSubscription(data: any) {
    console.log(data);

    switch (data.type) {
      case AuthAction.GENERATE_OTP_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open(data.payload.data.message, '', { duration: 2000 });
          this.showOtp = true;
          this.showPhnNumber = false;
          this.ref = data.payload.data.ref;
        }
      case AuthAction.FORGET_PASSWORD_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open(data.payload.data.message, '', { duration: 2000 });
        }
        break;
      case AuthAction.GET_LOGIN_SUCCESS:
      // if (data.payload.code === 200) {
      //     this.showVerifyOtpPopUp();
      //   this.snackBar.open(data.payload.data.message, '', { duration: 2000 });
      // }
    }
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      userid: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
      phnNumber: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
    });

    this.loginSuccess$.subscribe((data) => {
      if (data) {
        this.loginSuccess = data;
        if (
          this.loginSuccess &&
          this.loginSuccess.code === 200 &&
          this.loginSuccess.status === 'Success'
        ) {
          this.ref = this.loginSuccess.data.ref;
          this.showOtp = true;
          this.snackBar.open(this.loginSuccess.data.message, 'ok', {
            duration: 2500,
          });
          this.loginErrors = [];
          // this.router.navigate(['/dashboard']);
        } else if (
          this.loginSuccess &&
          this.loginSuccess.code === 201 &&
          this.loginSuccess.message
        ) {
          this.loginErrors.push(this.loginSuccess.msg);
        }
      }
    });

    //verifying if the user is firstime or not, if first time showing the setpassword popup, if not redirecting to the dashboard page
    this.verifyOTPSuccessSub = this.verifyOTPSuccess$.subscribe((data) => {
      if (data) {
        this.verfiyOTPSuccess = data;
        if (
          this.verfiyOTPSuccess.code === 200 &&
          this.verfiyOTPSuccess.status === 'Success' &&
          this.verfiyOTPSuccess.data.firstLogin
        ) {
          localStorage.setItem(
            'accessToken',
            this.verfiyOTPSuccess.data.accessToken
          );
          this.setPasswordDialog();
        } else if (
          this.verfiyOTPSuccess.code === 200 &&
          this.verfiyOTPSuccess.status === 'Success' &&
          !this.verfiyOTPSuccess.data.firstLogin
        ) {
          localStorage.setItem(
            'accessToken',
            this.verfiyOTPSuccess.data.accessToken
          );
          localStorage.setItem(
            'refreshToken',
            this.verfiyOTPSuccess.data.refreshToken
          );
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  encrypt(pwd: any) {
    const pubPem = Forge.pki.publicKeyFromPem(publicKey);
    // console.log(pubPem.encrypt("Test",'RSA-OAEP'));
    return Forge.util.encode64(pubPem.encrypt(pwd, 'RSA-OAEP'));
  }
  //Submitting login form
  onLoginForm() {
    this.loginErrors = [];
    if (!this.showOtp && !this.showPhnNumber) {
      const payload = {
        userId: this.loginForm.value.userid,
        pwd: this.encrypt(this.loginForm.value.pwd),
      };
      this.store.dispatch(new AuthAction.GetLogin(payload));
      localStorage.setItem('userName', payload.userId);
    } else if (this.showPhnNumber) {
      const payload = {
        mob: this.loginForm.value.phnNumber,
      };
      this.store.dispatch(new AuthAction.GenerateOtp(payload));
    } else if (this.showOtp) {
      const payload = {
        ref: this.ref,
        otp: +this.loginForm.value.otp,
      };
      this.store.dispatch(new AuthAction.VerifyOtp(payload));
    }
  }

  //click on forgort password link
  onForgotPass() {
    this.dialog.open(ForgotDialogComponent, {
      width: '450px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        content:
          'Dont worry we are here help you to reset your password. Enter your registered email address to get link to reset password.',
        title: 'Forgot Password',
      },
    });
  }

  onSignup() {
    this.router.navigate(['signup']);
  }

  showDialog() {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '350px',
      height: 'auto',
      data: {
        title: 'Application Submitted Successfully !',
        content:
          'we have received your application. We are currently reviewing your application. After Successful verificatio you will receive Username and Password through email. We will get back to you with the status within 2-3 days',
        ok: true,
        cancel: false,
        button: 'Done',
      },
    });
  }

  //Click on loginvia otp
  onLoginViaOtp() {
    this.showPhnNumber = !this.showPhnNumber;
    // const dailogRef = this.dialog.open(LoginViaOtpComponent, {
    //   width: '350px',
    //   height: 'auto',
    //   data: {
    //     page: 'loginViaOtp',
    //     ref: this.ref,
    //   },
    // });
    // dailogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.showVerifyOtpPopUp();
    //   }
    // });
  }

  //showing verify otp popup
  showVerifyOtpPopUp() {
    this.dialog.open(LoginViaOtpComponent, {
      width: '350px',
      height: 'auto',
      data: { page: 'verifyOtp', ref: this.ref },
    });
  }

  //showing setpassword popup
  setPasswordDialog() {
    const dailogRef = this.dialog.open(SetPasswordDialogComponent, {
      width: '350px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'setPassword',
      },
    });
  }

  ngDestroy() {
    this.showOtp = false;
    this.showPhnNumber = false;
  }
}
