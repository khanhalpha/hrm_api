import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://192.168.4.207:8080/api/jwtdecode/checkmenu';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient) { }

  //get All menu for
  getMenu() {
    return this.http.get(API_URL);
  }
}
