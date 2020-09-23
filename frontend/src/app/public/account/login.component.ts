import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/userLogin';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  user: UserLogin;
  ref = '';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = new UserLogin();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.ref = params.ref;
      console.log('param,', params);
    });
  }

  Login(form) {
    this.authService.ValidateUser(form.value).subscribe((res) => {
      const authObj: User = res;
      if (authObj.email !== '') {
        authObj.isAuth = true;
        this.authService.setAuthUser(authObj);
        if (this.ref !== undefined && this.ref !== '') {
          this.router.navigate([this.ref]);
        } else {
          if (authObj.roles.indexOf('Admin') > -1) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
        }
      }
    }, (err) => {
      console.log('err', err);
    });
  }
}
