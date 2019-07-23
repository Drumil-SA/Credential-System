import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProjectDetailComponent } from '../app/project-detail/project-detail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  {path: '', redirectTo: '/user-auth', pathMatch: 'full'},
  {path: 'user-auth', component: UserAuthComponent},
  {path: 'user-profile', component: UserProfileComponent },
  {path: 'project-edit', component : ProjectDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
