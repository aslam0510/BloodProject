import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { AddBloodRequestComponent } from './../../Dialogs/forgot-dialog/AddBloodRequest/AddBloodRequest.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BroadcastMsgDialogComponent } from './../../Dialogs/broadcastMsgDialog/broadcastMsgDialog.component';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../store/Actions/sideNavAction';
import * as DashboardActions from '../../store/Actions/dashboardActions';
import * as AuthActions from '../../store/Actions/auth.action';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentRouter = '';
  sideMenus = [
    {
      menu: 'Dashboard',
      icon: '/assets/Images/dashboardactive.svg',
      route: '/dashboard',
    },
    {
      menu: 'Blood Availability',
      icon: '/assets/Images/Bloodavailability.svg',
      route: '/dashboard/bloodAvailability',
    },
    {
      menu: 'Bood Request',
      icon: '/assets/Images/Bloodrequest.svg',
      route: '/dashboard/bloodRequest',
    },
    {
      menu: 'Messages',
      icon: '/assets/Images/Allmessages.svg',
      route: '/dashboard/allMessages',
    },
    {
      menu: 'Donor Database',
      icon: '/assets/Images/donordatabase.svg',
      route: '/dashboard/donorDatabase',
    },
    {
      menu: 'Blood Donation',
      icon: '/assets/Images/scandonor.svg',
      route: 'scanDonar',
    },
    {
      menu: 'UserManagement',
      icon: '/assets/Images/usermanagement.svg',
      route: '/dashboard/userManagement',
    },
  ];

  bloodGroupCards = [
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
    { bloodGroup: 'A+', AvailableUnit: 100, openRequest: 60, request: 120 },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 0,
  };
  public barChartLabels: Label[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  today: any;
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30] },
  ];
  activityDetails$: Observable<any>;
  activityDetails: any;
  activityDetailsSub: any;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.activityDetails$ = this.store.select(
      (state) => state.DashboardSlice.activityDetailsByDate
    );
  }

  ngOnInit() {
    this.today = moment();
    this.store.dispatch(new DashboardActions.GetActivitiesByDate(''));
    this.store.dispatch(new SideNavActions.GetBloodGroupList());
    this.store.dispatch(new SideNavActions.GetBloodCompList());
    this.store.dispatch(new DashboardActions.GetDashboardSummary());
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
        console.log(this.currentRouter);
        console.log(this.currentRouter !== '/dashboard/orgSettings');
      }
    });
    this.activityDetailsSub = this.activityDetails$.subscribe((data) => {
      if (data) {
        this.activityDetails = data.data.details;
      }
    });
  }

  onAddBloodReq() {
    this.router.navigate(['/addBldRequest']);
    // const dailogRef = this.dialog.open(AddBloodRequestComponent, {
    //   width: '850px',
    //   height: 'auto',
    //   panelClass: 'custom-dialog-container',
    // });

    // dailogRef.afterClosed().subscribe((result) => {
    //   dailogRef.close();
    // });
  }

  onBroadCaseMsg(event) {
    const dialogConfig = new MatDialogConfig();
    let targetAttr = event.target.getBoundingClientRect();

    dialogConfig.height = 'auto';
    dialogConfig.width = '850px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.position = {
      bottom: '10px',
      right: '20px',
    };

    this.dialog.open(BroadcastMsgDialogComponent, dialogConfig);
  }

  onOrgsetting() {}

  onLogOut() {
    const payload = {
      refreshToken: localStorage.getItem('refreshToken'),
    };
    this.store.dispatch(new AuthActions.Logout(payload));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  orgValueChange(date) {
    this.store.dispatch(new DashboardActions.GetActivitiesByDate(date));
  }
}
