import { Component, OnInit , ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/_service/employee.service';
import { Employee} from'src/app/_datasource/Employee';
import { EmployeeDataSource} from'src/app/_datasource/EmployeeDataSource';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SkillService } from 'src/app/_service/skill.service';
import { DepartmentService } from 'src/app/_service/department.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  isLoading = true;
  employees : Employee[];
  employeeDatasource : EmployeeDataSource;
  skills : any;
  departments : any;
  skillId = 0;
  departmentId = 0;
  fullname = '';
  tableLoad = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'avata', 'name', 'skill' , 'gender', 'birthday', 'department', 'edit', 'delete'];
  
  constructor(
    private router : Router,
    private employeeService : EmployeeService,
    private skillService : SkillService,
    private departmentService : DepartmentService
    ) { }

  ngOnInit(): void {
    
    this.employeeDatasource = new EmployeeDataSource(this.employeeService);
    //this.employeeDatasource.loadEmployees();
    this.employeeDatasource.loadEmployeesFilter();
    this.skillService.getAll().subscribe(
      data => this.skills = data
    );
    this.departmentService.getAll().subscribe(
      data => this.departments = data
    );
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
    //this.employeeDatasource.loadEmployees(this.paginator.pageIndex, this.paginator.pageSize);
    this.employeeDatasource.loadEmployeesFilter(this.fullname, this.skillId, this.departmentId, this.paginator.pageIndex, this.paginator.pageSize);
    console.log(this.employeeDatasource);
    this.tableLoad = true;
  }

  public redirectToDetail = (id : number) => {
    this.router.navigate(['employees/detail', id]);
  }

  redirectToEdit(id : number)
  {
    this.router.navigate(['employees/edit', id]);
  }

  clickSearch()
  {
    this.loadEmployees();
    //console.log(this.fullname);
  }
}
