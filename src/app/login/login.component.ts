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
  isLoading: boolean=false;
  temp: boolean=true;
  constructor(private backendService: BackendAccessService, private router: Router, private authService: AuthService) {}
  login(form : NgForm): void {
    this.backendService.login().subscribe(users => {
      this.userList = users;
      if(!this.isLoading && this.temp){
        this.temp=false;
        this.isLoading=true;
      }
      else{
        const user = this.userList.find(u => u.UserID === form.value.UserName && u.Password === form.value.password);
        if (user && this.isLoading) {
          this.authService.login();
          this.router.navigate(['/navbar']);
        } else {
          window.alert('UserName or Password Incorrect...');
          this.isLoading=false;
        }
      }
    });
  }
}
