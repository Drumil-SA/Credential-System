import { Component, OnInit } from '@angular/core';
import { UsersService } from './user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';

  constructor(private user: UsersService){  }

  ngOnInit(){
        // this.user.getUsers();
  }
}
