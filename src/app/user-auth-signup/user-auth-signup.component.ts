import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-auth-signup.component.html',
  styleUrls: ['./user-auth-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      useremail: ['', [Validators.email, Validators.required]]
    });
  }

  onSubmit() {
    const name = this.loginForm.value.username;
    const email = this.loginForm.value.useremail;
    const password = this.loginForm.value.password;
    this.userService.addUser({ name, email, password }).subscribe((res) => {
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
}

