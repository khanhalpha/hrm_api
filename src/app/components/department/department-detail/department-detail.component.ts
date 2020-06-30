import { Component, OnInit } from '@angular/core';
import { DepartmentService, Department } from 'src/app/_service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  id : number;
  department : Department;
  fb: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'shortname': [
      { type: 'required', message: 'Short name is required.' }
    ],
   };

  constructor(
    private departmentService : DepartmentService,
    private route : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.departmentService.get(this.id)
      .subscribe(data => {
        console.log(data);
        this.department = data;
      }, error => console.log(error));
  }

  onSubmit()
  {
    this.departmentService.update(this.id, this.department).subscribe(
      data => {
        console.log(data);       
      },
      err => {
        console.log(err)
      }
    );
    this.router.navigate(['/departments']);
  }
}
