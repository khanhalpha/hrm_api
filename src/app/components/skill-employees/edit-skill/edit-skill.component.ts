import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_datasource/Employee';
import { Skills } from 'src/app/_datasource/Skills';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { LevelofskillService } from 'src/app/_service/levelofskill.service';
import { SkillService } from 'src/app/_service/skill.service';
import { EmployeeSkillService } from 'src/app/_service/employee-skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  id: number;
  employee: Employee;
  exampleForm: FormGroup;
  levels: any;
  skills: any;
  empskill: Skills[];
  displayedColumns: string[] = ['ID', 'Name', 'Description', ];
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private lvSkillService: LevelofskillService,
    private skillService: SkillService,
    private skillEmployeeService : EmployeeSkillService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployee(this.id);
    this.createForm();
    this.getSkill();
    this.getLevelSkill();
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      data => {
        this.employee = data;
        this.empskill = this.employee.skills;
        //add form skill
        if (this.empskill.length == 0) {
          this.addSkill(0,0,0);
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

  createForm() {
    this.exampleForm = this.fb.group({
      skills: this.fb.array([])
    });
  }

  get skillForms() {
    return this.exampleForm.get('skills') as FormArray

  }

  addSkill(skillId = 0, levelId = 0, empskillId = 0 ) {
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

  onSubmit()
  {
    console.log(JSON.stringify(this.skillForms.value));
    this.skillEmployeeService.update(this.id, JSON.stringify(this.skillForms.value)).subscribe(
      data => 
      {
        console.log(data);
        this.router.navigate(['skill-employees']);
      },
      err => console.log(err)      
    );
  }
}
