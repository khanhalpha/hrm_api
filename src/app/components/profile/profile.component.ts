import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_service/department.service';
import { EmployeeService } from 'src/app/_service/employee.service';
import { LevelofskillService} from 'src/app/_service/levelofskill.service';
import { SkillService } from 'src/app/_service/skill.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  validation_messages = {
    'fullname': [{ type: 'required', message: 'Name is required.' }],
    'surname': [{ type: 'required', message: 'Surname is required.' }],
    'age': [{ type: 'required', message: 'Age is required.' },],
    'department': [{ type: 'require', message: 'Department is required' }],
    'birthday' : [{ type: 'require', message: 'Birthday is required' }],
  };
  departments: any;
  levels: any;
  skills :any;
  genders = [
    { "id" : 0 , "name" : "Nam" },
    { "id" : 1 , "name" : "Nữ"},
  ];
  constructor(private fb: FormBuilder,
    private router: Router,
    private departmentSevice: DepartmentService,
    private employeeService : EmployeeService,
    private lvSkillService : LevelofskillService,
    private skillService : SkillService) { }

  ngOnInit(): void {
    this.createForm();
    this.lvSkillService.getAll().subscribe(
      data => {
        this.levels = data;
        console.log(data);
      },
      err => console.log(err)
    )
    this.skillService.getAll().subscribe(
      data => {
        this.skills = data;
        console.log(data);
      },
      err => console.log(err)
    )    
  }

  ngAfterViewInit() {
    this.addSkill();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      fullname: ['', Validators.required],
      gender : [''],
      department: ['', Validators.required],
      birthday: ['', Validators.required],
      skills : this.fb.array([])
    });
  }

  get skillForms() {
    return this.exampleForm.get('skills') as FormArray
  }

  addSkill() {
    const skill = this.fb.group({ 
      skill: [],
      level: [],
    })
  
    this.skillForms.push(skill);
  }

  deleteSkill(i) {
    this.skillForms.removeAt(i)
  }

  onSubmit(value) {
    const data = {
      fullname : value.fullname,
      gender : value.gender,
      birthday : value.birthday,
      departmentid : value.department
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
