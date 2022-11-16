import { DashboardCardsComponent } from './../Components/Dashboard/dashboard-cards/dashboard-cards.component';
import { Routes } from '@angular/router';
import { AddEntityComponent } from '../Components/addEntity/addEntity.component';
import { BldReqViewComponent } from '../Components/bldReqView/bldReqView.component';
import { AllMessagesComponent } from '../Components/Dashboard/all-messages/all-messages.component';
import { AllBloodReqComponent } from '../Components/Dashboard/allBloodReq/allBloodReq.component';
import { AppDashboardComponent } from '../Components/Dashboard/app-dashboard/app-dashboard.component';
import { BloodAvailabilityComponent } from '../Components/Dashboard/bloodAvailability/bloodAvailability.component';
import { DonarDatabaseComponent } from '../Components/Dashboard/donarDatabase/donarDatabase.component';
import { EditDonorRepoComponent } from '../Components/Dashboard/donarDatabase/edit-donor-repo/edit-donor-repo.component';
import { OrgSettingsComponent } from '../Components/orgSettings/orgSettings.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { UserManagementComponent } from '../Components/userManagement/userManagement.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './../Components/Dashboard/Dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: AppDashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'bloodAvailability',
        component: BloodAvailabilityComponent,
        pathMatch: 'full',
      },
      {
        path: 'bloodRequest',
        component: AllBloodReqComponent,
        pathMatch: 'full',
      },
      {
        path: 'editBloodRequest/:id',
        component: BldReqViewComponent,
        pathMatch: 'full',
      },
      {
        path: 'donorDatabase',
        component: DonarDatabaseComponent,
        pathMatch: 'full',
      },
      {
        path: 'editDonorRep/:id',
        component: EditDonorRepoComponent,
        pathMatch: 'full',
      },
      {
        path: 'userManagement',
        component: UserManagementComponent,
        pathMatch: 'full',
      },
      {
        path: 'allMessages',
        component: AllMessagesComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'orgSettings',
        component: OrgSettingsComponent,
        pathMatch: 'full',
      },
      {
        path: 'addEntity',
        component: AddEntityComponent,
        pathMatch: 'full',
      },
      {
        path: 'dashboardCards',
        component: DashboardCardsComponent,
        pathMatch: 'full',
      },
    ],
  },
];
