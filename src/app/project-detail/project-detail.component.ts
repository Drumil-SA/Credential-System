import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


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
      projectFile: [null, Validators.required],
      projectTitle: [null, Validators.required],
      projectDescription: [null, Validators.required]
    });
  }

  onSubmit() {
    const token = localStorage.getItem('currentUser');
    console.log('this.token' + token);
    // const userId = this.userService.currentUserValue.id;
    // const userName = this.userService.currentUserValue.name;
    this.userService.getUserData(token).subscribe((data) => {
      console.log('Inside Submit');
      console.log(!!data);
      if (data) {
        console.log(data);
        console.log(typeof(data));

        this.userId = data['user']['_id'];
        // this.userName = data['user']['name'];
        console.log('while uploading project');
        console.log(this.userId, '   ', this.userName);
        const createdBy = this.userId;
        const sharedTo = [];
        let projectFileURL = '';
        const projectTitle = this.projectForm.value.projectTitle;
        this.userService.getAWSFileURL(projectTitle).subscribe((res) => {
          if (res) {
            console.log(res.URL);
            projectFileURL = res.URL + projectTitle;
            const projectDescription = this.projectForm.value.projectDescription;
            this.userService.addProject({ projectFileURL, projectTitle, projectDescription, createdBy, sharedTo }).subscribe( res1 => {
              if (res1) {
                console.log(res1);
              } else {
                console.log('Add project fail');
              }
            }, (err) => {
              console.log(err);
            });
          } else {
            alert('error while uploading project.Please try again later');
          }
        });
      } else {
        alert('error while uploading project.Please try again later');
      }
    });
  }
}
