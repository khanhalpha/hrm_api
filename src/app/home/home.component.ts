import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenStorageService } from '../_service/token-storage.service';
import { Router } from '@angular/router';
import { HomeService } from '../_service/home.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  private roles: string[];
  isLoggedIn = false;
  username: string;
  showMenu = true;
  listMenu = [];
  langs = {
    'en-US': 'English',
    'vi-VN': 'Vietnamese',
  };
  constructor(
    private tokenStorageService: TokenStorageService,
    private router : Router,
    private homeService : HomeService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }

    this.getMenus();
  }

  //-- xu ly login
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('auth-user')
    console.log(!(user === null))
    return !(user === null)
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  directProfile()
  {
    this.router.navigate(['/profile']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
 }

 getMenus()
 {
   this.homeService.getMenu().subscribe(
     (data : any )=> {
       console.log(data);
       data.forEach((element : any )=> {
         if(!element.hide)
         {
          this.listMenu.push(element);
         }
       });
       console.log(this.listMenu);
          
     }
   )
 }
}
