import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: any;
  constructor(private authService: AuthService, private router: Router) {}

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
}
