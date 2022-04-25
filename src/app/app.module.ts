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
