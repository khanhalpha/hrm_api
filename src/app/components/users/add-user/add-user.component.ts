import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_datasource/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  id: number;
  user: User;
  userForm: FormGroup;
  validation_messages = {
    'username': [{ type: 'required', message: 'Username is required.' }],
    'password': [{ type: 'required', message: 'Password is required.' }],
    'employee': [{ type: 'required', message: 'employee is required.' },],
    'roles': [{ type: 'require', message: 'Roles is required' }],
  };
  roleList: string[] = ['ADMIN', 'MANAGER', 'DEPARTMENT', 'PROJECTLEAD','MEMBERS'];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      employee: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  onSubmit(value) {
    console.log(value);

  }
}
