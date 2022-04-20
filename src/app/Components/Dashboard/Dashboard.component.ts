import { Component, OnInit } from '@angular/core';

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
      route: '/bloodAvailable',
    },
    { menu: 'All Bood Request', icon: 'search', route: '/bloodRequest' },
    { menu: 'All Messages', icon: 'search', route: '/allMessages' },
    { menu: 'Donor Database', icon: 'search', route: 'donorDatabase' },
    { menu: 'Scan Donar', icon: 'search', route: 'scanDonar' },
    { menu: 'UserManagement', icon: 'search', route: 'userManagement' },
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
  constructor() {}

  ngOnInit() {}
}
