import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }
  logout() {
    console.log("logout");
    this.userService.logout();
  }
}
