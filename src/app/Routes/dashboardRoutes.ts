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
      },
      {
        path: 'bloodRequest',
        component: AllBloodReqComponent,
      },
      {
        path: 'editBloodRequest/:id',
        component: BldReqViewComponent,
      },
      {
        path: 'donorDatabase',
        component: DonarDatabaseComponent,
      },
      {
        path: 'editDonorRep/:id',
        component: EditDonorRepoComponent,
      },
      {
        path: 'userManagement',
        component: UserManagementComponent,
      },
      {
        path: 'allMessages',
        component: AllMessagesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'orgSettings',
        component: OrgSettingsComponent,
      },
      {
        path: 'addEntity',
        component: AddEntityComponent,
      },
      {
        path: 'dashboardCards',
        component: DashboardCardsComponent,
      },
    ],
  },
];
