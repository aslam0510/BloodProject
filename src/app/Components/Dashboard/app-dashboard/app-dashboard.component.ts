import { ActivatedRoute, Router } from '@angular/router';
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
  activityData: any;
  showMoreActivity: boolean = true;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 30] },
  ];

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = [];
  displayedColumns: string[] = [];
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
  routerUrl = 0;
  userRole = '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    this.store.dispatch(new DashboardActions.GetUserDetails());
    this.store.dispatch(new DashboardActions.ClearEntities());
    this.route.queryParamMap.subscribe((param) => {
      this.routerUrl = +param.get('id');
    });
    this.userRole = localStorage.getItem('role');
    this.bldAvailableSelectedVal = 'availableUnit';
    if (this.userRole == 'Organization Admin') {
      this.store.dispatch(new DashboardActions.GetEntityDetails());
    }
    this.store.dispatch(
      new DashboardActions.GetDashboardSummary(this.routerUrl)
    );

    this.dashboardBloodAvaialbeSub = this.dashboardBloodAvailable$.subscribe(
      (data) => {
        if (data) {
          this.dashboardBloodAvailable = [];
          this.dashboardBloodAvailable = data;
          this.wholeBld = [];
          this.plasma = [];
          this.plattets = [];
          this.prbc = [];
          this.displayedColumns = [];
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
          (this.displayedColumns = ['Blood Component']),
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
        this.activityData = data?.activities;
        this.activityDetails = data?.activities.slice(0, 3);
      }
    });
  }
  //changing blood available status button value
  public onBlodAvailableValChange(val: string) {
    this.bldAvailableSelectedVal = val;
  }

  OnViewAllClick(data) {
    if (data === 'more') {
      this.showMoreActivity = false;
      this.activityDetails = this.activityData;
    } else {
      this.showMoreActivity = true;
      this.activityDetails = this.activityData.slice(0, 3);
    }
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

  ngDestroy() {
    this.dashboardBloodAvaialbeSub.unsubscribe();
  }

  onViewAll() {
    this.router.navigate(['/dashboard/bloodAvailability'], {
      queryParams: { id: this.routerUrl },
    });
  }
}
