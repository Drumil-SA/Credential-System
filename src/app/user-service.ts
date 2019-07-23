import {HttpClient} from '@angular/common/http';

export class UsersService {

  constructor(private http: HttpClient) {
  }
  url = "http://localhost:3000/";
  // getUsers() {
  //   this.http.get(this.url + 'auth').subscribe((res) => {
  //       console.log(res);
  //   });
  // }

  authUser(name: string , password: string) {
    return this.http.get(this.url + 'loginAuth');
  }

  addUser(name: string , email: string , password: string) {
    // console.log(name+" "+email+" "+password);
    this.http.post(this.url + 'signup', name).subscribe(res =>{
      console.log(res);
    });
  }

}
