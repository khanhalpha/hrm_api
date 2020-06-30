import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RoleScreenService } from 'src/app/_service/role-screen.service';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-screen',
  templateUrl: './role-screen.component.html',
  styleUrls: ['./role-screen.component.css']
})



export class RoleScreenComponent implements OnInit {

  dataSource = new MatTableDataSource();
  tables = [{ columnDef: "nameScreen", header: "Screen Name" }];
  displayedColumns: any;
  dataTable = [];
  dataServer: any;
  isLoading = true;
  constructor(
    private roleScreenService: RoleScreenService,
    private router: Router) { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.roleScreenService.getAllRoles().pipe(delay(500)).subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0)
          //add cac ten man hình o column 1, va cột screenid cho cột action
          data[0].roleScreens.forEach(element => {
            this.dataTable.push({ nameScreen: element.screen.screenName, action: element.screen.id });
          });

        data.forEach((element1, index1) => {
          //add cac cột động cho lưới
          this.tables.push({ columnDef: element1.name, header: element1.name });
          //add cac gia tri accsess cho tung man hinh theo role
          data[index1].roleScreens.forEach((element2, index2) => {
            this.dataTable[index2][element1.name] = element2.access ? 1 : 0;
          })

        });
        //add column cuoi la cot button edit
        this.tables.push({ columnDef: 'action', header: 'Ation' });
        console.log(this.dataTable);
        //mang cac cột của lưới
        this.displayedColumns = [...this.tables.map(x => x.columnDef)];
        //gán datasource cho lưới
        this.dataSource = new MatTableDataSource(this.dataTable);
        this.isLoading = false;
      }
    )
  }

  redirectToEdit(screenId: number) {
    this.router.navigate(['role-screen/edit', screenId]);
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // isAllspeakSelected(): boolean {
  //     const numRows = this.dataSource.data.length;
  //     let selectedcount : number ;
  //     selectedcount= 0 ; 
  //     this.dataSource.data.forEach(ele => {
  //       if (ele.canspeak === true) {
  //           selectedcount+=1;
  //       }
  //     });
  //     if (numRows === selectedcount) { 
  //       return true
  //     }
  //     return false;
  //   }

  //   SelectAllspeak(event: MatCheckboxChange ) {
  //      this.dataSource.data.forEach(ele => {
  //       ele.canspeak =event.checked;
  //     });
  //   }

  // isAllwriteSelected(): boolean {
  //     const numRows = this.dataSource.data.length;
  //     let selectedcount : number ;
  //     selectedcount= 0 ; 
  //     this.dataSource.data.forEach(ele => {
  //       if (ele.canwrite === true) {
  //           selectedcount+=1;
  //       }
  //     });

  //     if (numRows === selectedcount) { 

  //       return true
  //     }

  //     return false;
  //   }
  //    SelectAllwrite(event: MatCheckboxChange ) {
  //      this.dataSource.data.forEach(ele => {
  //       ele.canwrite =event.checked;
  //     });
  //   }

}
