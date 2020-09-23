import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (!(this.authService.user != null && this.authService.user.isAuth)) {
      this.router.navigate(['login']);
      return false;
    } else if (this.authService.user.roles.indexOf('Admin') > -1) {
      return true;
    } else {
      this.router.navigate(['unauthorize']);
      return false;
    }
  }
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (!(this.authService.user != null && this.authService.user.isAuth)) {
      this.router.navigate(['login']);
      return false;
    } else if (this.authService.user.roles.indexOf('User') > -1) {
      return true;
    } else {
      this.router.navigate(['unauthorize']);
      return false;
    }
  }
}
