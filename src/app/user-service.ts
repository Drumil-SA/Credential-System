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

  userProfile(token) {
    console.log('Inside userProfile');
    console.log(token);
    return this.http.post(this.url + '/userProfile', token);
  }

  getUserData(token) {
    return this.http.post(this.url + '/getUserData', token);
  }

  loginUser(user) {
    return this.http.post(this.url + '/login', user)
    .pipe(map(token => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('inside LoginUser');
      localStorage.setItem('currentUser', JSON.stringify(token));
      this.currentUserSubject.next(token); // token
      console.log(token);
      return token;
  }));
}
   userProject:any;
   selectProjectId:any;

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

  getAWSFileURL(fileTitle) {
    return this.http.post<{URL: string}>(this.url + '/getS3URL', fileTitle);
  }

  getUserProjects(tokenObj) {
    console.log('Calling backend getUserProject');
    console.log(tokenObj);
    return this.http.post(this.url + '/getUserProjects', {tokenObj});
  }

  getProjectDetail(id: any) {
    console.log('Calling project detail');
    console.log(id);
    return this.http.post(this.url + '/getProjectDetail', {id : id});
  }

  deleteProject(id: any) {
    console.log('Project delete');
    console.log(id);
    return this.http.post(this.url + '/deleteProject', {id : id});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/user-login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
    // return !!this.http.post('/isLoggedIn', tokenObj);
  }

  getToken() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }
}
