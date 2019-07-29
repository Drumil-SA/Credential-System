import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserLoginComponent implements OnInit {
  // currentmode = 'signup';
  // authmode = 'login';
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // username:  ['', Validators.required],
      useremail: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
        // if (this.currentmode === 'login') {
      if (this.loginForm.valid) {
      const email = this.loginForm.value.useremail;
      const password = this.loginForm.value.password;
      this.userService.loginUser({email, password}).subscribe((res) => {
        if (res) {
          console.log(res);
          this.router.navigate(['/user-profile']);
          // const userData = this.getUserProfile(res);
        } else {
          alert('Login fail');
        }
      },  (err) => {
          alert('Login fail');
          console.log(err);
      });

    } else {
    console.log('error while login');
  }
}
}

