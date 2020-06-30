import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_datasource/Employee';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_service/department.service';
import { EmployeeService } from 'src/app/_service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Skills } from 'src/app/_datasource/Skills';
import { LevelofskillService } from 'src/app/_service/levelofskill.service';
import { SkillService } from 'src/app/_service/skill.service';
import { EmployeeSkillService } from 'src/app/_service/employee-skill.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  id: number;
  employee: Employee;
  infoForm: FormGroup;
  skillForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  validation_messages = {
    'fullname': [{ type: 'required', message: 'Name is required.' }],
    'surname': [{ type: 'required', message: 'Surname is required.' }],
    'age': [{ type: 'required', message: 'Age is required.' },],
    'department': [{ type: 'require', message: 'Department is required' }],
    'birthday': [{ type: 'require', message: 'Birthday is required' }],
    'PhoneNumber': [{ type: 'required', message: 'PhoneNumber is required' }],
    'email': [{ type: 'required', message: 'Email is required' }]
  };
  departments: any;
  levels: any;
  skills: any;
  empskill: Skills[];
  genders = [
    { "id": 0, "name": "Nam" },
    { "id": 1, "name": "Nữ" },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private departmentSevice: DepartmentService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private lvSkillService: LevelofskillService,
    private skillService: SkillService,
    private skillEmployeeService: EmployeeSkillService, ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.departmentSevice.getAll().subscribe(
      data => this.departments = data,
      err => console.log(err)
    );
    this.createFormInfo();
    this.getEmployee(this.id);
    this.createFormSkill();
    this.getSkill();
    this.getLevelSkill();
  }

  createFormInfo() {
    var datePipe = new DatePipe("en-US");
    this.employeeService.getEmployee(this.id).subscribe(
      data => {
        this.employee = data;
        // console.log(this.employee);
        // console.log(datePipe.transform(data.birthday, 'dd/MM/yyyy'));
        this.infoForm = this.fb.group({
          fullname: [data.fullname, Validators.required],
          gender: [data.gender ? 1 : 0],
          department: [data.department.id, Validators.required],
          birthday: [new Date(data.birthday), Validators.required],
          PhoneNumber: new FormControl(data.phone, [Validators.pattern(/[0-9\+\-\ ]/)]),
          address: [data.address],
          email: [data.email, Validators.email]
        });
      },
      err => {
        console.log(err);
      }
    )

  }

  onSubmit(value) {
    //data thong tin ca nhan
    const data = {
      fullname: value.fullname,
      gender: value.gender,
      birthday: value.birthday,
      departmentid: value.department,
      address: value.address,
      phone: value.PhoneNumber,
      email: value.email
    };
    this.employeeService.updateEmplyee(this.id, data).subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/employees']);
        console.log(JSON.stringify(this.skillForms.value));
        this.skillEmployeeService.update(this.id, JSON.stringify(this.skillForms.value)).subscribe(
          data => {
            console.log(data);
            this.router.navigate(['employees']);
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );

    //data skill

  }


  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      data => {
        this.employee = data;
        this.empskill = this.employee.skills;
        console.log(data);
        //add form skill
        if (this.empskill.length == 0) {
          this.addSkill(0, 0, 0);
        }
        else {
          this.empskill.forEach(element => {
            this.addSkill(element.skill.id, element.level.id, element.employeeskillid);
          });
        }
      },
      err => console.log(err)
    )
  }

  getSkill() {
    this.skillService.getAll().subscribe(
      data => {
        this.skills = data;
      },
      err => console.log(err)
    )
  }

  getLevelSkill() {
    this.lvSkillService.getAll().subscribe(
      data => {
        this.levels = data;
      },
      err => console.log(err)
    )
  }

  ngAfterViewInit() {
  }

  createFormSkill() {
    this.skillForm = this.fb.group({
      skills: this.fb.array([])
    });
  }

  get skillForms() {
    return this.skillForm.get('skills') as FormArray

  }

  addSkill(skillId = 0, levelId = 0, empskillId = 0) {
    const skill = this.fb.group({
      skill: [skillId],
      level: [levelId],
      empskill: [empskillId]
    })
    this.skillForms.push(skill);
  }

  deleteSkill(i) {
    this.skillForms.removeAt(i)
  }

  onSubmitSkill() {
    console.log(JSON.stringify(this.skillForms.value));
    this.skillEmployeeService.update(this.id, JSON.stringify(this.skillForms.value)).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['skill-employees']);
      },
      err => console.log(err)
    );
  }
}
