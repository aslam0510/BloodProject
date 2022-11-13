import { SignupComponent } from './Components/Signup/Signup.component';
import { HomeComponent } from './Components/Home/Home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './Dialogs/resetPassword/resetPassword.component';
import { dashboardRoutes } from './Routes/dashboardRoutes';
import { AddEntityComponent } from './Components/addEntity/addEntity.component';
import { AddBloodRequestComponent } from './Dialogs/forgot-dialog/AddBloodRequest/AddBloodRequest.component';
import { DashboardCardsComponent } from './Components/Dashboard/dashboard-cards/dashboard-cards.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'resetPassword/:token',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'addEntity',
    pathMatch: 'full',
    component: AddEntityComponent,
  },
  {
    path: 'addBldRequest',
    pathMatch: 'full',
    component: AddBloodRequestComponent,
  },
  {
    path: 'dashboardCards',
    component: DashboardCardsComponent,
  },
  ...dashboardRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
