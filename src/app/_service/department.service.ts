import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://192.168.4.207:8080/api/departments';

export class Department{
  constructor(
    public id:string,
    public departmentName:string,
    public departmentShort:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  department : Department;
  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get(API_URL);
  }

  creat(data)
  {
    return this.http.post(API_URL , data);
  }

  get(id) : Observable<any>
  {
    return this.http.get(`${API_URL}/${id}`);
  }

  update(id, data)
  {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id)
  {
    return this.http.delete(`${API_URL}/${id}`);
  }

  getProject(data)
  {
    return this.http.post('http://192.168.4.207:8080/api/projects', data);
  }

  getProjectLang(data)
  {
    return this.http.post('http://192.168.4.207:8080/api/projects?lang=vn', data);
  }
}
