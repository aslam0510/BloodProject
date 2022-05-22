import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoginViaOtpComponent } from './../../Dialogs/loginViaOtp/loginViaOtp.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  loginCards = [
    {
      icon: '/assets/Images/usrMange.svg',
      content: 'User Management & Role based access control and security.',
    },
    {
      icon: '/assets/Images/trackandmaintain.svg',
      content: 'Track and maintain all donor types.',
    },
    {
      icon: '/assets/Images/registeredPatients.svg',
      content:
        'Requisition for manual as well as computer registered patients.',
    },
    {
      icon: '/assets/Images/powerfullfacility.svg',
      content: 'Powerful search facility.',
    },
    {
      icon: '/assets/Images/stockrate.svg',
      content: 'Stock transfer',
    },
    {
      icon: '/assets/Images/edit.svg',
      content: 'Edit your profile from anywhere, effortlessly.',
    },
  ];
  generateOtp$: Observable<any>;
  generateOtp: any;
  generateOtpSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.generateOtp$ = this.store.select(
      (state) => state.AuthSlice.generateOtp
    );
  }

  ngOnInit() {
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
