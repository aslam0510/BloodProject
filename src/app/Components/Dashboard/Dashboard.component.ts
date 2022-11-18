import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
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
      menu: 'Blood Request',
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
      menu: 'User Management',
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
  showDate = '';
  entities$: Observable<any>;
  entities: any;
  entitiesSub: Subscription;
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30] },
  ];
  activityDetails$: Observable<any>;
  activityDetails: any;
  activityDetailsSub: any;
  showSideBar = 'show';
  routerUrl = 0;
  userDetails$: Observable<any>;
  userDetails: any;
  userDetailsSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.activityDetails$ = this.store.select(
      (state) => state.DashboardSlice.activityDetailsByDate
    );
    this.entities$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );

    this.userDetails$ = this.store.select(
      (state) => state.DashboardSlice.userDetails
    );

    this.store.dispatch(new DashboardActions.ClearEntities());
  }

  ngOnInit() {
    this.userDetailsSub = this.userDetails$.subscribe((response) => {
      if (response) {
        this.userDetails = response.data;
        localStorage.setItem('role', this.userDetails.role);
      }
    });
    if (this.userDetails?.role == 'Organization Admin') {
      this.store.dispatch(new DashboardActions.GetEntityDetails());
    }

    this.route.queryParamMap.subscribe((param) => {
      this.showSideBar = param.get('display');
      this.routerUrl = +param.get('id');
    });

    this.today = moment();
    if (this.routerUrl) {
      this.store.dispatch(
        new DashboardActions.GetActivitiesByDate({
          date: this.today.format('MM-DD-YYYY'),
          id: this.routerUrl,
        })
      );
      this.store.dispatch(new SideNavActions.GetBloodGroupList(this.routerUrl));
      this.store.dispatch(new SideNavActions.GetBloodCompList(this.routerUrl));
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
      }
    });
    this.activityDetailsSub = this.activityDetails$.subscribe((data) => {
      if (data) {
        this.activityDetails = data.data.details;
      }
    });
    this.entitiesSub = this.entities$.subscribe((data) => {
      if (data) {
        this.entities = data.data.details.filter((x) => x.apsts !== 0);
      }
    });
  }

  onAddBloodReq() {
    if (this.showSideBar === 'hide') {
      return false;
    } else {
      this.router.navigate(['/addBldRequest'], {
        queryParams: { id: this.routerUrl },
      });
    }

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
    if (this.showSideBar === 'hide') {
      return false;
    } else {
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
  }

  //remove date from blood component status
  onRemoveBloodComDate(event) {
    event.stopPropagation();

    this.showDate = '';
  }

  onOrgsetting() {
    this.router.navigate(['/dashboard/orgSettings'], {
      queryParams: { id: this.routerUrl },
    });
  }
  onProfile() {
    this.router.navigate(['/dashboard/profile'], {
      queryParams: { id: this.routerUrl },
    });
  }
  onLogOut() {
    const payload = {
      refreshToken: localStorage.getItem('refreshToken'),
    };
    this.store.dispatch(new AuthActions.Logout(payload));
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    // this.router.navigate(['/login']);
  }

  orgValueChange(date) {
    this.showDate = date;
    // this.store.dispatch(new DashboardActions.GetActivitiesByDate(date));
  }

  onMenu(route) {
    if (this.showSideBar === 'hide') {
      return false;
    } else {
      this.router.navigate([`${route}`], {
        queryParams: { id: this.routerUrl },
      });
    }
  }

  onEntity(event) {
    this.router.navigate([`dashboard`], {
      queryParams: { id: event.value },
    });
    this.store.dispatch(new DashboardActions.GetDashboardSummary(event.value));
  }
}
