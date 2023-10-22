import { Component, OnInit } from '@angular/core';
import { BackendAccessService } from './backend-access.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userList: any = [];
  expresponse: string = '';

  constructor(private backendService: BackendAccessService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.backendService.getAllUsers().subscribe(users => {
      this.userList = users;
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
    });
  }
}
