import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API_URL = 'http://192.168.4.207:8080/api/jwtdecode';

@Injectable({
  providedIn: 'root'
})
export class JwthelperService {

  constructor(private http: HttpClient) { }

  getRole()
  {
    return this.http.get(API_URL + '/roles');
  }

  getCheckRole(params)
  {
    return this.http.get(API_URL + '/checkrole', { params });
  }
}
