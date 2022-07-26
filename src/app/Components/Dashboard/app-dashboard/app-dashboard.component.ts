import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AppState } from 'src/app/app.state';
import * as DashboardActions from '../../../store/Actions/dashboardActions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css'],
})
export class AppDashboardComponent implements OnInit {
  sideMenus = [
    { menu: 'Dashboard', icon: 'search', route: '/dashboard' },
    {
      menu: 'All Blood Availability',
      icon: 'search',
      route: '/bloodAvailable',
    },
    { menu: 'All Bood Request', icon: 'search', route: '/bloodRequest' },
    { menu: 'All Messages', icon: 'email', route: '/allMessages' },
    { menu: 'Donor Database', icon: 'folder_open', route: 'donorDatabase' },
    { menu: 'Scan Donar', icon: 'search', route: 'scanDonar' },
    { menu: 'UserManagement', icon: 'people', route: 'userManagement' },
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

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30] },
  ];

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = [];
  displayedColumns: string[] = ['Blood Component'];
  dashboardBloodAvailable$: Observable<any>;
  dashboardBloodAvailable: any;
  dashboardBloodAvaialbeSub: Subscription;
  bldRequestStatus$: Observable<any>;
  bldRequestStatus: any;
  bldRequestStatusSub: Subscription;
  wholeBld = [];
  prbc = [];
  plasma = [];
  plattets = [];
  public bldAvailableSelectedVal: string;
  showAvailableUnit: boolean = true;
  showOpenRequest: boolean = false;
  showRequiredUnit: boolean = false;
  activityDetails$: Observable<any>;
  activityDetails: any;
  activityDetailsSub: any;

  constructor(private store: Store<AppState>) {
    this.dashboardBloodAvailable$ = this.store.select(
      (state) => state.DashboardSlice.bloodAvailable
    );
    this.bldRequestStatus$ = this.store.select(
      (state) => state.DashboardSlice.bldRequestStatus
    );
    this.activityDetails$ = this.store.select(
      (state) => state.DashboardSlice.activityDetails
    );
  }

  ngOnInit() {
    this.bldAvailableSelectedVal = 'availableUnit';
    this.store.dispatch(new DashboardActions.GetDashboardSummary());
    this.dashboardBloodAvaialbeSub = this.dashboardBloodAvailable$.subscribe(
      (data) => {
        if (data) {
          this.dashboardBloodAvailable = data;
          this.dashboardBloodAvailable.forEach((x) => {
            this.wholeBld.push(
              ...x.availability.filter((y) => y.bldComponent === 'Whole Blood')
            );
            this.plasma.push(
              ...x.availability.filter((y) => y.bldComponent === 'Plasma')
            );
            this.plattets.push(
              ...x.availability.filter(
                (y) => y.bldComponent === 'Platelet Poor Plasma'
              )
            );
            this.prbc.push(
              ...x.availability.filter((y) => y.bldComponent === 'PRBC')
            );
          });
          this.dashboardBloodAvailable.forEach((x) => {
            this.displayedColumns = this.displayedColumns.concat(x._id);
          });
        }
      }
    );
    this.bldRequestStatusSub = this.bldRequestStatus$.subscribe((data) => {
      if (data) {
        this.bldRequestStatus = data;
      }
    });

    this.activityDetailsSub = this.activityDetails$.subscribe((data) => {
      if (data) {
        this.activityDetails = data;
      }
    });
  }
  //changing blood available status button value
  public onBlodAvailableValChange(val: string) {
    this.bldAvailableSelectedVal = val;
  }

  onBldAvailableDaySelect(type) {
    if (type === 'availableUnit') {
      this.showAvailableUnit = true;
      this.showOpenRequest = false;
      this.showRequiredUnit = false;
    } else if (type === 'openRequest') {
      this.showAvailableUnit = false;
      this.showOpenRequest = true;
      this.showRequiredUnit = false;
    } else if (type === 'requiredUnit') {
      this.showAvailableUnit = false;
      this.showOpenRequest = false;
      this.showRequiredUnit = true;
    } else {
      this.showAvailableUnit = true;
      this.showOpenRequest = false;
      this.showRequiredUnit = false;
    }
  }
}
