import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { TimePipe } from './time.pipe';
import { AllUsersComponent } from './all-users/all-users.component';
import { ShowTweetsComponent } from './show-tweets/show-tweets.component';
import { MyTweetsComponent } from './my-tweets/my-tweets.component';
import { UpdateDeleteTweetComponent } from './update-delete-tweet/update-delete-tweet.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    InitialPageComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SignupComponent,
    TimePipe,
    AllUsersComponent,
    ShowTweetsComponent,
    MyTweetsComponent,
    UpdateDeleteTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
