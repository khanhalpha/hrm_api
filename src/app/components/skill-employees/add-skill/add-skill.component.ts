import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee} from'src/app/_datasource/Employee';
import { Skills } from 'src/app/_datasource/Skills';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  id : number;
  employee : Employee ;
  skills : Skills[];
  constructor(
    private employeeService : EmployeeService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id).subscribe(
      data => {
        this.employee = data;
        console.log(this.employee.fullname);
        this.skills = this.employee.skills;
      },
      err => console.log(err)
    )
  }

}
