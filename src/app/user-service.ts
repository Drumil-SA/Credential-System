import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
// tslint:disable-next-line: class-name
interface newUser {
  name: string;
  email: string;
  password: string;
}

// interface projectType {
//   projectFile: File,
//   projectTitle: string,
//   projectDescription: string,
//   createdBy: object,
//   shareTo: Array<string>
// }
export class UsersService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  htmlElement: HTMLElement;
  url = 'http://localhost:3000';


  // getUsers() {
  //   this.http.get(this.url + 'auth').subscribe((res) => {
  //       console.log(res);
  //   });
  // }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  userProfile(user) {
    this.http.post(this.url + '/user-profile', user).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
  }


  loginUser(user) {
    return this.http.post(this.url + '/login', user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
}

  // tslint:disable-next-line: no-shadowed-variable
  addUser(newUser: newUser) {
    // console.log(name+" "+email+" "+password);
    // console.log(newUser);
    return this.http.post(this.url + '/signup', newUser)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
  }

  addProject(project) {
    return this.http.post(this.url + '/addProject', project);
  }
  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/user-auth']);
  }
}
