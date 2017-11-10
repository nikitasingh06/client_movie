import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../connect-db.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-sign-up',
  templateUrl: './verify-sign-up.component.html',
  styleUrls: ['./verify-sign-up.component.css']
})
export class VerifySignUpComponent implements OnInit {

  code;
  constructor(public connect: ConnectDbService, public router: Router) { }

  ngOnInit() {
  }
  
  verification() {
    this.connect.VerifyCode(this.code).subscribe(res => {
      if (res.data != "code did not match") {
        if (res.data.username) {
          alert("You already belong to the comic city!")
        }
        else {
          alert('Welcome');
          this.router.navigate(["/login"]);         
        }
      }
      else {
        alert('Please enter the correct code');
      }
    })
  }
}
