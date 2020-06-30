import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://192.168.4.207:8080/api/lvskills';

export interface LevelOfSkill{
     id:string,
     levelName:string,
     levelDescription:string,
}

@Injectable({
  providedIn: 'root'
})
export class LevelofskillService {

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get(API_URL);
  }

}
