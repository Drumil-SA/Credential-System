import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-project',
  templateUrl: './shared-project.component.html',
  styleUrls: ['./shared-project.component.css']
})
export class SharedProjectComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {}
  //   this.userService.isLoggedIn(localStorage.getItem('currentUser')).subscribe(res => {
  //     if (!res) {
  //       alert('Login or signup first');
  //       this.router.navigate(['/user-login']);
  //     }
  //   }, err => {
  //     alert('Login fail');
  //   });
  // }

}
