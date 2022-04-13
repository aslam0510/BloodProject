import { FooterComponent } from './Components/footer/footer.component';
import { AppInterceptorService } from './services/app-interceptor.service';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
