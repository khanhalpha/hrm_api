import { Component, OnInit } from '@angular/core';
import { RoleScreenService } from 'src/app/_service/role-screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-role-screen-edit',
  templateUrl: './role-screen-edit.component.html',
  styleUrls: ['./role-screen-edit.component.css']
})
export class RoleScreenEditComponent implements OnInit {

  id: number;
  nameScreen: string;
  roleScreen = [];

  tables = [{ columnDef: "nameScreen", header: "Tên màn hình" }];
  displayedColumns: any;
  dataTable = [];
  dataServer: any;
  isLoading = true;
  listRole = [];
  constructor(
    private roleScreenService: RoleScreenService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //this.getRoleScreenDetail();
    this.getRole();
  }

  getRoleScreenDetail() {
    this.roleScreenService.getRoleScreenDetail(this.id).subscribe(
      (data: any) => {
        if (data.length > 0) {
          data.forEach(element => {
            this.roleScreen.push(
              {
                rolescreenid: element[0],
                roleid: element[1],
                rolename: element[2],
                screenid: element[3],
                access: element[4],
                screenname: element[5],
                screenurl: element[6],
              }
            );
          });
          console.log(this.roleScreen);
          this.nameScreen = this.roleScreen[0].screenname;

        }
      }
    );
  }

  onChange(e) {

  }

  getRole() {
    this.roleScreenService.getAllRoles().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0)
          //add cac ten man hình o column 1, va cột screenid cho cột action
          data[0].roleScreens.forEach(element => {
            this.dataTable.push({ screenid: element.screen.id, nameScreen: element.screen.screenName });
          });

        data.forEach((element1, index1) => {
          //add cac cột động cho lưới
          this.tables.push({ columnDef: element1.name, header: element1.name });
          this.listRole.push({ roleid: element1.id, rolename: element1.name });
          //add cac gia tri accsess cho tung man hinh theo role
          data[index1].roleScreens.forEach((element2, index2) => {
            //console.log(element2.listAction[0].access );

            //this.dataTable[index2][element1.name] = element2.access ? 1 : 0;
            this.dataTable[index2][element1.name] = {
              access: element2.access ? 1 : 0,
              create: element2.listAction[0]['access'] ? 1 : 0,
              edit: element2.listAction[1]['access'] ? 1 : 0,
              delete: element2.listAction[2]['access'] ? 1 : 0,
            };
          })

        });
        this.dataTable.forEach(element => {

          if (this.id == element.screenid) {
            // this.roleScreen = element;
            console.log(element);
            this.nameScreen = element.nameScreen;
            this.listRole.forEach(role => {
              this.roleScreen.push(
                {
                  screenid: element.screenid,
                  roleid: role.roleid,
                  rolename: role.rolename,
                  access: element[role.rolename].access,
                  create: element[role.rolename].create,
                  edit: element[role.rolename].edit,
                  delete: element[role.rolename].delete,
                }
              );
            });
            console.log(this.roleScreen);
          }
        });
        //gán datasource cho lưới
        this.isLoading = false;
      }
    )
  }

  saveData() {
    console.log(this.roleScreen);
    this.roleScreenService.saveRoleScreen(this.id, this.roleScreen).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['role-screen']);
      },
      err => console.log(err)
    );
  }
}
