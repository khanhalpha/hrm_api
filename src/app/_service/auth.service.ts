import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_datasource/User';
import { map } from 'rxjs/operators';
const AUTH_API = 'http://192.168.4.207:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const jwtSecret = 'brycenSecretKey';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  login(credentials): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password,
      secretkey: jwtSecret
    }, httpOptions);
  }

  register(user): Observable < any > {
      return this.http.post(AUTH_API + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
      }, httpOptions);
    }
}
