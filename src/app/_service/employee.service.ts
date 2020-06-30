import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { EmployeeResponse } from '../_datasource/Employee';

const API_URL = 'http://192.168.4.207:8080/api/employees';

export interface Employee{
     empId:string,
     empName:string,
     birthDay:Date,
     gender:boolean,
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(request)
  {
    const endpoint = API_URL;
    const params = request;
    return this.http.get(endpoint, { params });
  }

  getEmployeesFilter(request)
  {
    const endpoint = 'http://192.168.4.207:8080/api/employees/filter';
    const params = request;
    return this.http.get(endpoint, { params });
  }

  getAllEmployees()
  {
    return this.http.get('http://192.168.4.207:8080/api/employees/getall');
  }

  creatEmployee(data)
  {
    return this.http.post(API_URL, data);
  }

  getEmployee(id: number) : Observable<any>
  {
    return this.http.get(`${API_URL}/${id}`);
  }

  updateEmplyee(id, data)
  {
    return this.http.put(`${API_URL}/${id}`, data);
  }
}
