import { ResetPasswordComponent } from './../../Dialogs/resetPassword/resetPassword.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoginViaOtpComponent } from './../../Dialogs/loginViaOtp/loginViaOtp.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  loginCards = [
    {
      icon: '/assets/Images/homepage1.svg',
      content: 'User Management & Role based access control and security.',
    },
    {
      icon: '/assets/Images/homepage2.svg',
      content: 'Track and maintain all donor types.',
    },
    {
      icon: '/assets/Images/homepage3.svg',
      content:
        'Requisition for manual as well as computer registered patients.',
    },
    {
      icon: '/assets/Images/homepage4.svg',
      content: 'Powerful search facility.',
    },
    {
      icon: '/assets/Images/stockrate.svg',
      content: 'Stock transfer',
    },
    {
      icon: '/assets/Images/homepage6.svg',
      content: 'Edit your profile from anywhere, effortlessly.',
    },
  ];
  generateOtp$: Observable<any>;
  generateOtp: any;
  generateOtpSub: Subscription;
  urlToken: string = '';
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.generateOtp$ = this.store.select(
      (state) => state.AuthSlice.generateOtp
    );
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.urlToken = param.token;
    });

    if (this.urlToken) {
      this.dialog.open(ResetPasswordComponent, {
        width: '500px',
        height: 'auto',
        data: {
          token: this.urlToken,
        },
      });
    }
    this.generateOtpSub = this.generateOtp$.subscribe((data) => {
      if (data) {
        this.generateOtp = data;
      }
    });
  }

  ngOnDestory() {
    this.generateOtpSub.unsubscribe();
  }
}
