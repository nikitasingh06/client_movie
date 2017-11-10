import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../connect-db.service';
import { Router } from '@angular/router';
import { VerifySignUpComponent } from '../verify-sign-up/verify-sign-up.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  text:String='';
  nameEr:String;
  emailEr;
  passEr;
  cnEr;

  Newuser: {
    name: String,
    password: String,
    email: String,
    phoneNumber: String,
    code: String,
    userType: Number
  } = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    code: "",
    userType: 2
  };

  constructor(public connect: ConnectDbService, public router: Router) { }

  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++){
      this.text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return this.text;
  }

  signup() {
    if(this.Newuser.name=="" || this.Newuser.email=="" || this.Newuser.password=="" || this.Newuser.phoneNumber=="" ){
      if(this.Newuser.name==""){
        this.nameEr="enter name";
      }
      else
      {
        this.nameEr="";
      }
      if(this.Newuser.email==""){
        this.emailEr="enter email";
      }
      else
      {
        this.emailEr="";
      }
      if(this.Newuser.password==""){
        this.passEr="enter password";
      }
      else
      {
        this.passEr="";
      }
      if(this.Newuser.phoneNumber==""){
        this.cnEr="enter mobile no";
      }
      else
      {
        this.cnEr="";
      }
    }
      else {

   // window.open("http://localhost:4200/verify", "", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
   // this.makeid();
  //  this.Newuser.code = this.text;
    this.connect.PostUser(this.Newuser).subscribe(res => { })
  }

  }

  cancel() {
    this.Newuser.email = "";
    this.Newuser.phoneNumber = "";
    this.Newuser.password = "";
    this.Newuser.name = "";
  }


  ngOnInit() {
  }

}
