import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-auth-login/user-auth.component';
import { UserSignupComponent } from './user-auth-signup/user-auth-signup.component';
import { HeaderComponent } from './header/header.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AppRoutingModule } from './app-routing-module';
import {UsersService} from '../app/user-service';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedProjectComponent } from './shared-project/shared-project.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    HeaderComponent,
    ProjectDetailComponent,
    UserProfileComponent,
    HomePageComponent,
    ProjectListComponent,
    SharedProjectComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
