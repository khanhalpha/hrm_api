import { Component, OnInit , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/_datasource/User';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/_service/users.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = true;
  departments: any;
  displayedColumns: string[] = ['ID', 'Short', 'Name', 'Role', 'Edit', 'Delete'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(delay(500)).subscribe(
      reponse => {
        this.departments = reponse;
        this.dataSource = new MatTableDataSource(this.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  delelteConfirmDialog(id): void {
   
  }
  public deleteDepartment = (id) => {
    
  }
  redirectToUpdate (id) {
    this.router.navigate(['users/edit-user', id]);
  }
  addUser()
  {
    this.router.navigate(['users/add']);
  }
}
