import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { authInterceptorProviders} from './_helpers/auth.interceptor';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/department/departments/departments.component';
import { AddDepartmantComponent } from './components/department/add-departmant/add-departmant.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { DepartmentDetailComponent } from './components/department/department-detail/department-detail.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SkillEmployeesComponent } from './components/skill-employees/skill-employees.component';
import { AddSkillComponent } from './components/skill-employees/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill-employees/edit-skill/edit-skill.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { ErrorCodeComponent } from './components/shared/error-code/error-code.component';
import { Page403Component } from './components/sessions/page403/page403.component';
import { RoleScreenComponent } from './components/role-screen/role-screen.component';
import { RoleScreenEditComponent } from './components/role-screen/role-screen-edit/role-screen-edit.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    AddEmployeeComponent,
    EmployeesComponent,
    DepartmentsComponent,
    AddDepartmantComponent,
    DashboardComponent,
    SideNavComponent,
    EmployeeComponent,
    DepartmentDetailComponent,
    EmployeeDetailComponent,
    UsersComponent,
    ProfileComponent,
    SkillEmployeesComponent,
    AddSkillComponent,
    EditSkillComponent,
    EmployeeEditComponent,
    ConfirmDialogComponent,
    AddUserComponent,
    EditUserComponent,
    ErrorCodeComponent,
    Page403Component,
    RoleScreenComponent,
    RoleScreenEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule ,
    HttpClientModule,
  //   TranslateModule.forRoot({
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: (HttpLoaderFactory),
  //         deps: [HttpClient]
  //     }
  // })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
