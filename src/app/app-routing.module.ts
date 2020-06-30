import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/department/departments/departments.component';
import { AddDepartmantComponent } from './components/department/add-departmant/add-departmant.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { DepartmentDetailComponent } from './components/department/department-detail/department-detail.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SkillEmployeesComponent } from './components/skill-employees/skill-employees.component';
import { EditSkillComponent } from './components/skill-employees/edit-skill/edit-skill.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { Page403Component } from './components/sessions/page403/page403.component';
import { RoleScreenComponent } from './components/role-screen/role-screen.component';
import { RoleScreenEditComponent } from './components/role-screen/role-screen-edit/role-screen-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LogInComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { url: 'dashboard' } },
      { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard], data: { url: 'departments' } },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: { url: 'employees' } },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'skill-employees', component: SkillEmployeesComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { url: 'users' } },
      { path: '403', component: Page403Component, canActivate: [AuthGuard] },
      { path: 'role-screen', component: RoleScreenComponent, canActivate: [AuthGuard], data: { url: 'role-screen' } },
    ]
  },
  {
    path: 'departments', component: HomeComponent,
    children: [
      { path: 'add-department', component: AddDepartmantComponent, canActivate: [AuthGuard]},
      { path: 'detail/:id', component: DepartmentDetailComponent, canActivate: [AuthGuard] }
    ]
  },
  // { path: '',  component: HomeComponent, 
  //   children: [{ path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] }]},
  {
    path: 'employees', component: HomeComponent,
    children: [
      { path: 'add', component: AddEmployeeComponent, canActivate: [AuthGuard]},
      { path: 'detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'skill-employees', component: HomeComponent,
    children: [
      { path: 'edit/:id', component: EditSkillComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'users', component: HomeComponent,
    children: [
      { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'role-screen', component: HomeComponent,
    children: [
      { path: 'edit/:id', component: RoleScreenEditComponent , canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
