import { AddBloodRequestComponent } from './../../Dialogs/forgot-dialog/AddBloodRequest/AddBloodRequest.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sideMenus = [
    { menu: 'Dashboard', icon: 'search', route: '/dashboard' },
    {
      menu: 'All Blood Availability',
      icon: 'search',
      route: '/dashboard/bloodAvailability',
    },
    {
      menu: 'All Bood Request',
      icon: 'search',
      route: '/dashboard/bloodRequest',
    },
    { menu: 'All Messages', icon: 'email', route: '/dashboard/allMessages' },
    {
      menu: 'Donor Database',
      icon: 'folder_open',
      route: '/dashboard/donorDatabase',
    },
    { menu: 'Scan Donar', icon: 'search', route: 'scanDonar' },
    { menu: 'UserManagement', icon: 'people', route: 'userManagement ' },
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
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onAddBloodReq() {
    this.dialog.open(AddBloodRequestComponent, {
      width: '950px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }
}
