import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  userProjects: any;
  project = {};
  constructor(private userService: UsersService) { }

  ngOnInit() {
    const tokenObj = localStorage.getItem('currentUser');
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
    console.log(id);
    this.userService.getProjectDetail(id).subscribe((res) => {
      this.project = res;
      console.log('project' + this.project);
    }, (err) => {
      console.log(err);
    });
  }
}
