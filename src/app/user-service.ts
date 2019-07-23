import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// tslint:disable-next-line: class-name
interface newUser {
  name: string;
  email: string;
  password: string;
}
export class UsersService {

  constructor(private http: HttpClient, private router: Router) {
  }
  htmlElement: HTMLElement;
  url = 'http://localhost:3000';
  // getUsers() {
  //   this.http.get(this.url + 'auth').subscribe((res) => {
  //       console.log(res);
  //   });
  // }

  userProfile(user) {
    this.http.post(this.url + '/user-profile', user).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
  }
  authUser(user) {
    this.http.post(this.url + '/loginAuth', user).subscribe((res) => {
      if (res) {
        console.log(res);
        this.router.navigate(['/user-profile']);
      }
    },  (err) => {
        console.log(err);
        // this.htmlElement = err.error as HTMLElement;
        // console.log('html');
        // console.log(this.htmlElement);
    });
  }

  // ngOnChanges(){
  //   this.http.get(this.url + "/login").subscribe((User) => {
  //     console.log("After login");
  //     console.log(User);
  //   });
  // }

  // tslint:disable-next-line: no-shadowed-variable
  addUser(newUser: newUser) {
    // console.log(name+" "+email+" "+password);
    console.log(newUser);
    this.http.post(this.url + '/signup', newUser).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/user-profile']);
    },
    (err) => {
      alert('A user with that email has already registered. Please use a different email..');
      // console.log(err);
    });
  }

  // sendError() {
  //   return this.errorMessageSource.next(this.errorMessage);
  // }
}
