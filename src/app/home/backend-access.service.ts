import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
 
@Injectable({
  providedIn: 'root'
})
export class BackendAccessService {
  title = 'reactiveforms';
  userList : any = [];
  data : any ;
  expresponse : string = "";
  constructor (private http : HttpClient) {
   
  }
  addUser(form : NgForm){
    //var user : Data = {
    // uname : form.value.userid,
    // pwd : form.value.password,
    // emailid : form.value.emailid
    //}
    this.http.post('http://localhost:9901/insert', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
      return this.expresponse;
    })
  }
  getAllUsers(){
    this.http.get('http://localhost:9901/getAll').subscribe((response) => {
      this.userList = response;
      return this.userList;
    })
  }
}