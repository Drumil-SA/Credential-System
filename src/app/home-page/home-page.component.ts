import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
  }
  nextPage() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/user-profile']);
    } else {
      this.router.navigate(['/user-login']);
    }
  }
}
