import { RouterModule, Routes, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProjectDetailComponent } from '../app/project-detail/project-detail.component';
import { UserLoginComponent } from './user-auth-login/user-auth.component';
import { UserSignupComponent } from './user-auth-signup/user-auth-signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersService } from './user-service';
import { AuthGuard } from './helper/auth.guard';
import { SharedProjectComponent } from './shared-project/shared-project.component';

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full', canActivate : [AuthGuard]},
  {path: 'home-page', component: HomePageComponent},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'shared-project', component: SharedProjectComponent, canActivate : [AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent , pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'project-edit', component : ProjectDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
  constructor(
    private router: Router,
    private userService: UsersService
) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.currentUserValue;
    if (currentUser) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/user-login']);
    return false;
}
}
