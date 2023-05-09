import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthService } from './auth/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  authenticated = false;
  isAdmin = false;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.authService.currentUserValue){
      this.authenticated = true; 
      this.user = this.authService.currentUserValue;
      this.router.navigate(['/admin/home/' + this.authService.currentUserValue.username])
    } else {
      this.authenticated = false; 
      this.authService.logout();
      this.router.navigate(['/admin']);
    }
    if(this.authService.currentUserValue && this.authService.currentUserValue.is_staff == true){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }
  logout = (): void => {
    this.authService.logout();
    this.router.navigate(['/admin']);
    setTimeout(() => {
      location.reload();
    })
  }

}
