import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendAccessService } from './backend-access.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contactList: any = [];
  expresponse: string = "";

  constructor(private backendService: BackendAccessService) {}

  addContact(form: NgForm): void {
    this.backendService.addContact(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllContacts();
    });
  }

  getAllContacts(): void {
    this.backendService.getAllContacts().subscribe(contacts => {
      this.contactList = contacts;
    });
  }

  updateContact(form: NgForm): void {
    this.backendService.updateContact(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllContacts();
    });
  }

  deleteContact(form: NgForm): void {
    this.backendService.deleteContact(form).subscribe(response => {
      this.expresponse = response.toString();
      this.getAllContacts();
    });
  }

  searchContact(form: NgForm): void {
    const contactId = form.value.contactid;
    if (contactId) {
      this.backendService.searchContactByID(contactId).subscribe(contact => {
        this.contactList = contact;
        console.log(this.contactList);
      });
    } else {
      this.getAllContacts();
    }
  }
}
