import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_datasource/User';

const API_URL = 'http://192.168.4.207:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get(API_URL);
  }

  getUser(id : number) : Observable<User>
  {
    return this.http.get<User>(`${API_URL}/${id}`);
  }

  editUser(id, data)
  {
    return this.http.put(`${API_URL}/${id}`, data);
  }
}
