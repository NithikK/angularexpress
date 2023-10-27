import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendAccessService } from './backend-access.service';
import { Router } from '@angular/router';
import { AuthService } from '../navbar/AuthService';
interface User {
  UserID: string;
  Password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userList: User[] = [];
  expresponse: string = '';
  constructor(private backendService: BackendAccessService, private router: Router, private authService: AuthService) {}
  login(form : NgForm): void {
    this.backendService.login().subscribe(users => {
      this.userList = users;

      const user = this.userList.find(u => u.UserID === form.value.UserName && u.Password === form.value.password);
      if (user) {
        this.authService.login();
        this.router.navigate(['/']);
      } else {
        window.alert('UserName or Password Incorrect...');
      }
    });
  }
}
