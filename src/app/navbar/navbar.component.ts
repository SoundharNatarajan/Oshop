import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut();
  }

}
