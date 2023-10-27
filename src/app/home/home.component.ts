import { Component, OnInit } from '@angular/core';
import { BackendAccessService } from './backend-access.service';
import { NgForm } from '@angular/forms';
import Data from './data';


function count(length: number): string {
  var hide = "";
  for(var i = 0; i <= length; i++) {
      hide += "*";
  }
  return hide;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userList: Data[] = [];
  expresponse: string = '';
  showResult: boolean = false;

  constructor(private backendService: BackendAccessService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.backendService.getAllUsers().subscribe(users => {
      this.userList = users;
      this.userList.forEach(user => {
        user.password = count(user.password.length);
      });
      this.showResult = true;
    });
  }
  

  addUser(form: NgForm): void {
    this.backendService.addUser(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllUsers();
    });
  }

  updateUser(form: NgForm): void {
    this.backendService.updateUser(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllUsers();
    });
  }

  deleteUser(form: NgForm): void {
    this.backendService.deleteUser(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllUsers();
    });
  }

  searchUser(form: NgForm): void {
    const userId = form.value.uid;
    this.backendService.searchUser(userId).subscribe(users => {
      this.userList = users;
      this.userList.forEach(user => {
        user.password = count(user.password.length);
      });
      this.showResult = true;
    });
  }
}
