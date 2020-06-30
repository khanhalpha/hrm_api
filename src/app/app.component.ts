import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_service/token-storage.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // private roles: string[];
  // isLoggedIn = false;
  // showAdminBoard = false;
  // showModeratorBoard = false;
  // username: string;
  token : string;

  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit() {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   const user = this.tokenStorageService.getUser();
    //   this.roles = user.roles;

    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    //   this.username = user.username;
    // }

    
  }
  
  // //-- xu ly login
  // logout() {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }
  
  // isUserLoggedIn() {
  //   let user = sessionStorage.getItem('auth-user')
  //   console.log(!(user === null))
  //   return !(user === null)
  // }

}
