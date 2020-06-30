import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService, Department } from 'src/app/_service/department.service'
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;
  displayedColumns: string[] = ['ID', 'Short', 'Name', 'Status', 'Action'];
  dataSource: MatTableDataSource<Department>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading = true;
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.departmentService.getAll().pipe(delay(500)).subscribe(
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

  reloadData() {
    this.departmentService.getAll().subscribe(
      reponse => {
        this.departments = reponse;
        console.log(reponse);
        this.dataSource = new MatTableDataSource(this.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails = (id) => {

  }

  public redirectToUpdate = (id) => {
    this.router.navigate(['departments/detail', id]);
  }

  delelteConfirmDialog(id): void {
    const message = `Bạn có muốn xóa phòng ban này?`;
    const dialogData = new ConfirmDialogModel("Xác nhận xóa", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteDepartment(id);
      }
    });
  }
  public deleteDepartment = (id) => {
    this.departmentService.delete(id).subscribe(
      repose => {
        console.log(repose);
        this.reloadData();
      },
      err => console.log(err)
    )
  }

  addDepartment() {
    this.router.navigate(['departments/add-department']);
  }
}
