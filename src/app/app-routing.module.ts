import { CounterComponent } from './ngrx/counter/counter.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './Components/Signup/Signup.component';
import { HomeComponent } from './Components/Home/Home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/Dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
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
