import { Component } from '@angular/core';
import Data from './data';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BackendAccessService } from '././backend-access.service';//imported in app so since its inside a folder inside app give like this


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contactList : any = [];
  data : any ;
  expresponse : string = "";
  constructor (private http : HttpClient, private baccess: BackendAccessService) {
   
  }
  addContact(form : NgForm){
    this.http.post('http://localhost:9901/insertContact', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  getAllContacts(){
    this.http.get('http://localhost:9901/getAllContact').subscribe((response) => {
      this.contactList = response;
    })
  }
  updateContact(form : NgForm){
    this.http.put('http://localhost:9901/updateContact', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  deleteContact(form : NgForm){
    this.http.post('http://localhost:9901/deleteContact', form.value ).subscribe((response) => {
      this.expresponse = response.toString();
    })
  }
  searchContact(form : NgForm){
    this.contactList = [];
    this.http.get('http://localhost:9901/getContactByName', form.value).subscribe((response) => {
      this.contactList = response;
    })
  }
}
