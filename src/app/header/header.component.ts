import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UsersService) { }
  isLoged = false;
  ngOnInit() {
   
    // this.userService.isLoggedIn(tokenObj).subscribe((res) => {
    //   if (res) {
    //     this.isLoged = true;
    //   } else {
    //     this.isLoged = false;
    //   }
    // }, err => {
    //   this.isLoged = false;
    // });
  }

  isLoggedIn() {
    return !!this.userService.isLoggedIn();
  }
  
  logout() {
    console.log('logout');
    this.userService.logout();
  }
}
