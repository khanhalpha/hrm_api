import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const API_URL = 'http://192.168.4.207:8080/api/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get(API_URL);
  }
}
