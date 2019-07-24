import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

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
    const userId = this.userService.currentUserValue.id;
    const userName = this.userService.currentUserValue.name;
    const userObj = { userId , userName};
    const sharedTo = [];
    const projectFile = this.projectForm.value.projectFile;
    const projectTitle = this.projectForm.value.projectTitle;
    const projectDescription = this.projectForm.value.projectDescription;
    this.userService.addProject({projectFile, projectTitle, projectDescription, userObj, sharedTo}).subscribe((res) => {
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
