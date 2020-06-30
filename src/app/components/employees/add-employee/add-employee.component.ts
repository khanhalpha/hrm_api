import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_service/department.service';
import { EmployeeService } from 'src/app/_service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  validation_messages = {
    'fullname': [{ type: 'required', message: 'Name is required.' }],
    'surname': [{ type: 'required', message: 'Surname is required.' }],
    'age': [{ type: 'required', message: 'Age is required.' },],
    'department': [{ type: 'require', message: 'Department is required' }],
    'birthday' : [{ type: 'require', message: 'Birthday is required' }],
    'PhoneNumber' : [{ type: 'required', message: 'PhoneNumber is required' }],
    'email' : [{ type : 'required', message : 'Email is required'}]
  };
  departments: any;
  genders = [
    { "id" : 0 , "name" : "Nam" },
    { "id" : 1 , "name" : "Nữ"},
  ];
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(private fb: FormBuilder,
    private router: Router,
    private departmentSevice: DepartmentService,
    private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.createForm();
    this.departmentSevice.getAll().subscribe(
      data => this.departments = data,
      err => console.log(err)
    );
  }

  createForm() {
    this.exampleForm = this.fb.group({
      fullname: ['', Validators.required],
      gender : [''],
      department: ['', Validators.required],
      birthday: ['', Validators.required],
      PhoneNumber:new FormControl('',[Validators.pattern(/[0-9\+\-\ ]/)]),
      address : [''],
      email : ['',Validators.email]
    });
  }

  onSubmit(value) {
    const data = {
      fullname : value.fullname,
      gender : value.gender,
      birthday : value.birthday,
      departmentid : value.department,
      address : value.address,
      phone : value.PhoneNumber,
      email : value.email
    };
    this.employeeService.creatEmployee(data).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/employees']);
      },
      err => console.log(err)
    );
  }

}
