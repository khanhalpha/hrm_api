import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/_service/employee.service';
import { UserService } from 'src/app/_service/users.service';
import { User } from 'src/app/_datasource/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: number;
  user: User;
  userForm: FormGroup;
  validation_messages = {
    'username': [{ type: 'required', message: 'Username is required.' }],
    'password': [{ type: 'required', message: 'Password is required.' }],
    'employee': [{ type: 'required', message: 'employee is required.' },],
    'roles': [{ type: 'require', message: 'Roles is required' }],
  };
  roleList: string[] = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_DEPARTMENT', 'ROLE_PROJECTLEAD','ROLE_MEMBER'];
  employees: any;
  roleUser = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //this.createForm();
    this.id = this.route.snapshot.params['id'];
    //get user with ID from server
    this.userService.getUser(this.id).subscribe(
      data => {
        console.log(data);       
        this.user = data;

        //get role form data
        this.user.roles.forEach((element : any) => {
          this.roleUser.push(element.name);
        });

        //biding data for form control
        this.userForm = this.fb.group({
          username: [this.user.username, Validators.required],
          password: [''],
          employee: [this.user.employee.id, Validators.required],
          roles: [this.roleUser, Validators.required]
        });
      }
    );
    //get list employee form server
    this.employeeService.getAllEmployees().subscribe(
      data => this.employees = data
    );
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      employee: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  //button save send request for back end
  onSubmit(value) {
    console.log(value);
    this.userService.editUser(this.id, value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/users']);      
      },
      err => console.log(err)   
    )
  }
}
