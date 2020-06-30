import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL_ROLES = 'http://192.168.4.207:8080/api/roles';

const API_URL_ROLESSCREENDETAIL = 'http://192.168.4.207:8080/api/rolescreensdetail';

const API_URL_ROLESCREEN = 'http://192.168.4.207:8080/api/rolescreen';

@Injectable({
  providedIn: 'root'
})
export class RoleScreenService {

  constructor(private http: HttpClient) { }

  /* get data All Role from server API */
  getAllRoles() {
    return this.http.get(API_URL_ROLES);
  }

  getRoleScreenDetail(id : number)
  {
    return this.http.get(`${API_URL_ROLESSCREENDETAIL}/${id}`);
  }

  saveRoleScreen(id, data)
  {
    return this.http.put(`${API_URL_ROLESCREEN}/${id}`, data);
  }
}
