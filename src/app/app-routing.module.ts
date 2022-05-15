import { SignupComponent } from './Components/Signup/Signup.component';
import { HomeComponent } from './Components/Home/Home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './Dialogs/resetPassword/resetPassword.component';
import { dashboardRoutes } from './Routes/dashboardRoutes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
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
  ...dashboardRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
