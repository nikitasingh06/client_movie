import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../connect-db.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {

  loggeduserName: String = '';

  Newuser: {
    name: String,
    password: String,
    email: String,
    phoneNumber: String
  } = {
    name: '',
    password: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private service: ConnectDbService) { }

  ngOnInit() {
  }

  editDetails() {
    this.loggeduserName = this.service.getuserName();
    console.log("name in edit compo", this.loggeduserName);
    console.log("name in edit compo", this.Newuser)
    // this.service.editUser(this.loggeduserName, this.Newuser)
    //   .subscribe(res => {
    //     alert("edited")
    //   })
  }

}
