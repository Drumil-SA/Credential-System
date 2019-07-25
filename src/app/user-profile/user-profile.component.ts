import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UsersService,private router: Router) { }
  username = '';
  email = '';
  numberOfProjects: number;
  ngOnInit() {
    console.log('Inside user profile component');
    const token = localStorage.getItem('currentUser');
    console.log(typeof(token));
    this.getUserProfile(JSON.parse(token));
    // // console.log(this.userService.currentUserValue);
    // this.username = this.userService.currentUserValue.name;
    // this.email = this.userService.currentUserValue.email;
    // this.username = this.userService.currentUserValue.name;
  }
  getUserProfile(token) {
    this.userService.userProfile(token).subscribe((userData) => {
      console.log('Inside Submit');
      console.log(userData);
      this.username = userData['name'];
      this.email = userData['email'];
    });
  }

  projectEdit(){
    this.router.navigate(['project-edit']);
  }
}
