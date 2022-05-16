import * as AuthAction from './../../store/Actions/auth.action';
import { Store } from '@ngrx/store';
import { ForgotDialogComponent } from './../../Dialogs/forgot-dialog/forgot-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';
import { OrgFormModel } from './../../models/orgFormModel';

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

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginSuccess$ = this.store.select((state) => state.AuthSlice.auth);

    this.loginErrors = [];
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userid: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
    });

    this.loginSuccess$.subscribe((data) => {
      if (data) {
        this.loginSuccess = data;
        if (this.loginSuccess && this.loginSuccess.code === 200) {
          localStorage.setItem('token', this.loginSuccess.data.token);
          this.loginErrors = [];
          this.router.navigate(['/dashboard']);
        } else if (
          this.loginSuccess &&
          this.loginSuccess.code === 201 &&
          this.loginSuccess.msg ===
            'The Email/Phone or password entered by you is incorrect'
        ) {
          this.loginErrors.push(this.loginSuccess.msg);
        }
      }
    });
  }

  onLoginForm() {
    if (this.loginForm.valid) {
      this.loginErrors = [];
      const salt = bcrypt.genSaltSync(10);
      const payload = {
        userid: this.loginForm.value.userid,
        pwd: bcrypt.hashSync(this.loginForm.value.pwd, salt),
      };

      this.store.dispatch(new AuthAction.GetLogin(payload));
      localStorage.setItem('userName', payload.userid);
    }
  }

  onForgotPass() {
    this.dialog.open(ForgotDialogComponent, {
      width: '450px',
      height: 'auto',
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
}
