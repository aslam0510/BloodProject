import { Routes } from '@angular/router';
import { BldReqViewComponent } from '../Components/bldReqView/bldReqView.component';
import { AllBloodReqComponent } from '../Components/Dashboard/allBloodReq/allBloodReq.component';
import { AppDashboardComponent } from '../Components/Dashboard/app-dashboard/app-dashboard.component';
import { BloodAvailabilityComponent } from '../Components/Dashboard/bloodAvailability/bloodAvailability.component';
import { DonarDatabaseComponent } from '../Components/Dashboard/donarDatabase/donarDatabase.component';
import { UserManagementComponent } from '../Components/userManagement/userManagement.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './../Components/Dashboard/Dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: AppDashboardComponent },
      {
        path: 'bloodAvailability',
        component: BloodAvailabilityComponent,
      },
      {
        path: 'bloodRequest',
        component: AllBloodReqComponent,
      },
      {
        path: 'bloodRequests',
        component: BldReqViewComponent,
      },
      {
        path: 'donorDatabase',
        component: DonarDatabaseComponent,
      },
      {
        path: 'userManagement',
        component: UserManagementComponent,
      },
    ],
  },
];
