import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userType;
  userLogin: FormGroup
  showError = false;

  constructor(public connect: ConnectDbService, private router: Router, public fb: FormBuilder) {
    this.userLogin = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  login() {
    if (this.userLogin.valid === true) {
      this.showError = false;
      this.connect.login(this.userLogin.value).subscribe(res => {
        if (res.status == false) {
          alert("wrong credentials")
        }
        else {
          console.log(res)
          // for (var obj of res) {
          //   if (obj.email == this.email && obj.password == this.password) {
          localStorage.setItem("userId", res.respdata.data._id)
          localStorage.setItem("name", res.respdata.data.name)
          this.userType = res.respdata.data.userType;
          localStorage.setItem('type', this.userType)
          if (this.userType == 1) {
            this.router.navigate(['/superadmin']);
          }
          else if (this.userType == 2) {
            this.router.navigate(['/admin']);

          }
          else if (this.userType == 3) {
            this.router.navigate(['/user']);
          }
        }
      })
      //     // else {
      //     //   alert("Username or Password is Incorrect! or User not verified!");
      //     // }
      //             // this.connect.setuserName(obj.name);
      //             // localStorage.setItem("loginStatus", "1");
      //             // this.router.navigate(['/product']);
      //      flag = 1;
      //             // localStorage.setItem("name", obj.name);
      //   }
      // if (!flag) {
      //   alert("Wrong credentials");
      // }
      // })
    }
    else {
      this.showError = true;
    }

  }


  cancel() {
    this.userLogin.value.email = "";
    this.userLogin.value.password = "";
  }



}
