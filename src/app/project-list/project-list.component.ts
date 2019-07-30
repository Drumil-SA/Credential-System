import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  userProjects: any;
  projectTitle: string;
  projectURL: string;
  displayProjectDescription = false;
  projectDescription: string;
  tokenObj: any;
  constructor(private userService: UsersService, private userProfile: UserProfileComponent) { }

  ngOnInit() {
    this.tokenObj = localStorage.getItem('currentUser');
    // this.getUserProjects(tokenObj);
    this.setUserProject();
  }


  setUserProject() {
    this.userProjects = this.userService.userProject;
  }
  // getUserProjects(tokenObj) {
  //   console.log('get user project');
  //   console.log(tokenObj);
  //   this.userService.getUserProjects(tokenObj).subscribe((res) => {
  //     if (res) {
  //       console.log('Angular' + res);
  //       this.userProjects = res;
  //     }
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  displayProjectDetail(id) {
    // this.userService.selectProjectId = id;
    // console.log('Display project');
    this.displayProjectDescription = true;
    console.log(id);
    this.userService.getProjectDetail(id).subscribe((res) => {
      console.log(res);
      // this.project = res;
      this.projectTitle = res['projectData']['projectTitle'];
      this.projectURL = res['projectData']['projectFileURL'];
      this.projectDescription = res['projectData']['projectDescription'];
      // console.log(this.project.projectTitle);
    }, (err) => {
      console.log(err);
    });
  }

  deleteProject(id) {
    this.userService.deleteProject(id).subscribe(res => {
      console.log(res);
      this.userProfile.getUserProjects(this.tokenObj);
    }, err => {
      console.log(err);
    });
  }
}
