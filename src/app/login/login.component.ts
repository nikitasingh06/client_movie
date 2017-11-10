import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ng2-facebook-sdk';
import { ConnectDbService } from '../connect-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: FacebookService, private router: Router, public connect: ConnectDbService) {
    service.init({
      appId: '181953409011113',
      version: 'v2.10'
    });
  }


  ngOnInit() {
  }


  fbgetuser(res) {
    console.log(res, " in fbgetuser")
    localStorage.setItem("name", res.name);
    this.connect.setuserName(res.name);
    localStorage.setItem("loginStatus", "1");
    this.router.navigate(['/product'])
  }

  fbLogin() {
    this.service.login()
      .then((res: LoginResponse) => {
        this.service.api('/me')
          .then((res: any) => {
            console.log("User's profile", res);
            alert("Hello " + res.name);
            this.fbgetuser(res);
          })
      })
      .catch(Error);
  }


}



