import { AddEntityComponent } from './Components/addEntity/addEntity.component';
import { AddUserDailogComponent } from './Components/userManagement/addUserDailog/addUserDailog.component';
import { UserManagementComponent } from './Components/userManagement/userManagement.component';
import { FilterComponent } from './Components/filter/filter.component';
import { UpdateBldStsDialogComponent } from './Dialogs/updateBldStsDialog/updateBldStsDialog.component';
import { DonarDatabaseComponent } from './Components/Dashboard/donarDatabase/donarDatabase.component';
import { AllBloodReqComponent } from './Components/Dashboard/allBloodReq/allBloodReq.component';
import { BloodAvailabilityComponent } from './Components/Dashboard/bloodAvailability/bloodAvailability.component';
import { AppDashboardComponent } from './Components/Dashboard/app-dashboard/app-dashboard.component';
import { AddBloodRequestComponent } from './Dialogs/forgot-dialog/AddBloodRequest/AddBloodRequest.component';
import { AppEffects } from './store/Effects/app.effects';
import { appReducers } from './app.state';
import { environment } from './../environments/environment';
import { FooterComponent } from './Components/footer/footer.component';
import { AppInterceptor, HttpStatus } from './services/app-interceptor.service';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './Components/Signup/Signup.component';
import { DashboardComponent } from './Components/Dashboard/Dashboard.component';
import { HomeComponent } from './Components/Home/Home.component';
import { LoginCardsComponent } from './Components/login-cards/login-cards.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './MaterialComponents';

import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotDialogComponent } from './Dialogs/forgot-dialog/forgot-dialog.component';
import { CounterComponent } from './ngrx/counter/counter.component';
import { CounterOutputComponent } from './ngrx/counter-output/counter-output.component';
import { CounterButtonsComponent } from './ngrx/counter-buttons/counter-buttons.component';
import { ChartsModule } from 'ng2-charts';
import { BloodGroupCardsComponent } from './Components/blood-group-cards/blood-group-cards.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SendMessageComponent } from './Dialogs/send-message/send-message.component';
import { Ng5SliderModule } from 'ng5-slider';
import { BroadcastMsgDialogComponent } from './Dialogs/broadcastMsgDialog/broadcastMsgDialog.component';
import { ResetPasswordComponent } from './Dialogs/resetPassword/resetPassword.component';
import { BldCompStDialogComponent } from './Dialogs/bldCompStDialog/bldCompStDialog.component';
import { NotificationDialogComponent } from './Dialogs/notificationDialog/notificationDialog.component';
import { BldReqViewComponent } from './Components/bldReqView/bldReqView.component';
import { RolesAndPermissionComponent } from './Components/rolesAndPermission/rolesAndPermission.component';
import { AppDialogComponent } from './Dialogs/appDialog/appDialog.component';
import { LoginViaOtpComponent } from './Dialogs/loginViaOtp/loginViaOtp.component';
import { SetPasswordDialogComponent } from './Dialogs/setPasswordDialog/setPasswordDialog.component';
import { AllMessagesComponent } from './Components/Dashboard/all-messages/all-messages.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { OrgSettingsComponent } from './Components/orgSettings/orgSettings.component';
import { SharedDialogComponent } from './Dialogs/sharedDialog/sharedDialog.component';

const httpServices = [AppInterceptor, HttpStatus];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCardsComponent,
    HomeComponent,
    DashboardComponent,
    SignupComponent,
    FooterComponent,
    ForgotDialogComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    BloodGroupCardsComponent,
    AddBloodRequestComponent,
    AppDashboardComponent,
    BloodAvailabilityComponent,
    AllBloodReqComponent,
    DonarDatabaseComponent,
    SendMessageComponent,
    UpdateBldStsDialogComponent,
    FilterComponent,
    BroadcastMsgDialogComponent,
    ResetPasswordComponent,
    BldCompStDialogComponent,
    NotificationDialogComponent,
    BldReqViewComponent,
    UserManagementComponent,
    AddUserDailogComponent,
    RolesAndPermissionComponent,
    AppDialogComponent,
    LoginViaOtpComponent,
    SetPasswordDialogComponent,
    AllMessagesComponent,
    ProfileComponent,
    OrgSettingsComponent,
    AddEntityComponent,
    SharedDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    ...httpServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
