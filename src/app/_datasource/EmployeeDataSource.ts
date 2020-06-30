import { DataSource } from '@angular/cdk/table';
import { Employee, EmployeeResponse } from './Employee';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { EmployeeService } from '../_service/employee.service';
import {delay} from 'rxjs/operators';

export class EmployeeDataSource implements DataSource<Employee>{
    private employeeSubject = new BehaviorSubject<Employee[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    public loading$ = this.loadingSubject.asObservable();

    constructor(private employeeService : EmployeeService) { }

    connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
        return this.employeeSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.employeeSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadEmployees(pageNumber = 0, pageSize = 20) {
        this.loadingSubject.next(true);
        this.employeeService.getEmployees({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                // delay(500),
                finalize(() => this.loadingSubject.next(false)),
                
            )
            .subscribe((result :EmployeeResponse) => {
                //console.log(result);
                this.employeeSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }

    loadEmployeesFilter(fullName = '', skillId = 0, departmntId = 0, pageNumber = 0, pageSize = 20) {
        this.loadingSubject.next(true);
        this.employeeService.getEmployeesFilter({fullname : fullName, skillId:skillId, departmentId :departmntId, page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                // delay(500),
                finalize(() => this.loadingSubject.next(false)),
                
            )
            .subscribe((result :EmployeeResponse) => {
                //console.log(result);
                this.employeeSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }
}