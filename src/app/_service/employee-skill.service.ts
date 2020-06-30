import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://192.168.4.207:8080/api/skill-employees';

export interface EmployeeSkill {
  skill : number;
  level : number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeSkillService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  constructor(private http: HttpClient,
    ) { }

  update(id, data)
  {
    return this.http.put(`${API_URL}/${id}`, data, this.httpOptions);
  }
}
