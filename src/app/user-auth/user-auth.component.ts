import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  currentmode = 'signup';
  authmode = 'login';
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username:  ['', Validators.required],
      password: ['', Validators.required],
      useremail: ['', [Validators.email, Validators.required]]
    });
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  //  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //       return;
  //   }

  // this.loading = true;
  // this.authenticationService.login(this.f.username.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe(
  //         data => {
  //             this.router.navigate([this.returnUrl]);
  //         },
  //         error => {
  //             this.alertService.error(error);
  //             this.loading = false;
  //         });
  // }

  switchMode() {
    if (this.authmode === 'login') {
      this.authmode = 'signup';
      this.currentmode = 'login';
      this.loginForm.reset();
    } else {
      this.authmode = 'login';
      this.currentmode = 'signup';
      this.loginForm.reset();
    }
  }

  onSubmit() {
    if (this.currentmode === 'login') {
      const email = this.loginForm.value.useremail;
      const password = this.loginForm.value.password;
      this.userService.loginUser({email, password}).subscribe((res) => {
        if (res) {
          console.log(res);
          this.router.navigate(['/user-profile']);
        } else {
          alert('Login fail');
        }
      },  (err) => {
          alert('Login fail');
          console.log(err);
          // this.htmlElement = err.error as HTMLElement;
          // console.log('html');
          // console.log(this.htmlElement);
      });

    } else  if (this.currentmode === 'signup'){
      const name = this.loginForm.value.username;
      const email = this.loginForm.value.useremail;
      const password = this.loginForm.value.password;
      this.userService.addUser({name, email, password}).subscribe((res) => {
        if (res) {
        console.log(res);
        this.router.navigate(['/user-profile']);
        }
      },
      (err) => {
        alert('A user with that email has already registered. Please use a different email..');
        // console.log(err);
      });
    }
    // setInterval(() => {
    //   console.log("back");
    //  this.abc = this.userService.htmlElement},5000);
  }
}
