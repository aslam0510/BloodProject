import { ForgotDialogComponent } from './../../Dialogs/forgot-dialog/forgot-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: any;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userid: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
    });
  }

  onLoginForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data) => {
        if (data) {
          this.loginDetails = data;
          localStorage.setItem('token', this.loginDetails.data.token);
          this.router.navigate(['dashboard']);
        }
      });
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
