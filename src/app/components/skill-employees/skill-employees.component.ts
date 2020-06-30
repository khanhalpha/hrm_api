import { Component, OnInit , ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/_service/employee.service';
import { Employee} from'src/app/_datasource/Employee';
import { EmployeeDataSource} from'src/app/_datasource/EmployeeDataSource';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-employees',
  templateUrl: './skill-employees.component.html',
  styleUrls: ['./skill-employees.component.css']
})
export class SkillEmployeesComponent implements OnInit {
  employees : Employee[];
  employeeDatasource : EmployeeDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'avata', 'name', 'skill', 'department', 'action'];

  constructor(private router : Router,
    private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.employeeDatasource = new EmployeeDataSource(this.employeeService);
    this.employeeDatasource.loadEmployees();
    // console.log(this.employeeDatasource);
  }

  ngAfterViewInit() {    
    this.employeeDatasource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.loadEmployees())
      )
      .subscribe(
        data => console.log(data)
        
      );
  }

  loadEmployees() {
    this.employeeDatasource.loadEmployees(this.paginator.pageIndex, this.paginator.pageSize);
  }

  redirecttToEdit(id : number) 
  {
    this.router.navigate(['skill-employees/edit', id]);
  }
}
