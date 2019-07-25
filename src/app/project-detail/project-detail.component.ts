import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  userId = '';
  userName = '';
  constructor(private userService: UsersService, private formBuilder: FormBuilder) { }
  projectForm: FormGroup;
  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      projectFile : [null, Validators.required],
      projectTitle: [null, Validators.required],
      projectDescription: [null, Validators.required]
    });
  }

  onSubmit() {
    const token = localStorage.getItem('currentUser');
    // const userId = this.userService.currentUserValue.id;
    // const userName = this.userService.currentUserValue.name;
    this.userService.userProfile(token).subscribe((userData) => {
      console.log('Inside Submit');
      console.log(userData);
      this.userId = userData['_id'];
      this.userName = userData['name'];
    });
    const userObj = { id: this.userId , username : this.userName};
    const sharedTo = [];
    let projectFileURL = '';
    const projectTitle = this.projectForm.value.projectTitle;
    this.userService.getAWSFileURL(projectTitle).subscribe((res) => {
      if(res){
        console.log(res.URL);
        projectFileURL = res.URL;
      }
    });
    const projectDescription = this.projectForm.value.projectDescription;
    this.userService.addProject({projectFileURL , projectTitle, projectDescription, userObj, sharedTo}).subscribe((res) => {
      if (res) {
        console.log(res);
      } else {
        console.log('Add project fail');
      }
    }, (err) => {
      console.log(err);
    });

  }

}
