import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/_service/department.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-departmant',
  templateUrl: './add-departmant.component.html',
  styleUrls: ['./add-departmant.component.css']
})
export class AddDepartmantComponent implements OnInit {
  deparment = {
    depName: '',
    depShort: ''
  }
  formGroup: FormGroup
  validation_messages = {
    'depName': [{ type: 'required', message: 'Name is required.' }],
    'depShort': [{ type: 'required', message: 'Short name is required.' }],
  };
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.formGroup = this.fb.group({
      depName: ['', Validators.required],
      depShort: ['', Validators.required]
    })
  }

  onSubmit(value)
  {
    const data = {
      departmentName: value.depName,
      departmentShort: value.depShort
    };
    this.departmentService.creat(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['departments']);
        },
        error => {
          console.log(error);
        });
  }

  clearData() {
    this.deparment.depName = '';
    this.deparment.depShort = '';
  }
}
