import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UsersService) { }
  username = '';
  email = '';
  numberOfProjects: number;
  ngOnInit() {
    this.username = this.userService.currentUserValue.name;
    this.email = this.userService.currentUserValue.email;
    // this.username = this.userService.currentUserValue.name;
  }

}
