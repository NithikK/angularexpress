import { Component } from '@angular/core';
import Data from './data';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BackendAccessService } from '././backend-access.service';//imported in app so since its inside a folder inside app give like this

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home';
  userList : any = [];
  data : any ;
  expresponse : string = "";
  constructor (private http : HttpClient, private baccess: BackendAccessService) {
   
  }
  addUser(form : NgForm){
    //var user : Data = {
    // uname : form.value.userid,
    // pwd : form.value.password,
    // emailid : form.value.emailid
    //}
    this.http.post('http://localhost:9901/insert', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  getAllUsers(){
    this.http.get('http://localhost:9901/getAll').subscribe((response) => {
      this.userList = response;
    })
  }
  updateUser(form : NgForm){
    this.http.put('http://localhost:9901/update', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  deleteUser(form : NgForm){
    this.http.post('http://localhost:9901/delete', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  search(form : NgForm){
    this.userList = [];
    this.http.get('http://localhost:9901/getById?uid='+ form.value.uid).subscribe((response) => {
      this.userList = response;
      console.log(form.value.uid);
    })
  }
}
