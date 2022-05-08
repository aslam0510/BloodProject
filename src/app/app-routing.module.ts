import { DonarDatabaseComponent } from './Components/Dashboard/donarDatabase/donarDatabase.component';
import { AllBloodReqComponent } from './Components/Dashboard/allBloodReq/allBloodReq.component';
import { BloodAvailabilityComponent } from './Components/Dashboard/bloodAvailability/bloodAvailability.component';
import { AppDashboardComponent } from './Components/Dashboard/app-dashboard/app-dashboard.component';
import { CounterComponent } from './ngrx/counter/counter.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './Components/Signup/Signup.component';
import { HomeComponent } from './Components/Home/Home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/Dashboard.component';
import { ResetPasswordComponent } from './Dialogs/resetPassword/resetPassword.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
        path: 'donorDatabase',
        component: DonarDatabaseComponent,
      },
    ],
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
  },
  {
    path: 'counter',
    pathMatch: 'full',
    component: CounterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
