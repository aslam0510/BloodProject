import * as AuthAction from './../../store/Actions/auth.action';
import { Store } from '@ngrx/store';
import { ForgotDialogComponent } from './../../Dialogs/forgot-dialog/forgot-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';

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
      const payload = {
        userid: this.loginForm.value.userid,
        pwd: this.loginForm.value.pwd,
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
}
