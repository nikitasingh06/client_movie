import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  userUpdate: FormGroup;
  user: FormGroup;
  flag;
  flagEdit;
  userid;
  users: any[];
  input;
  showError = false;

  constructor(public connect: ConnectDbService, public router: Router, public fb: FormBuilder) {
    this.user = fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]],
      // userName: ['', [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20), Validators.required]],
      userType: ['']
    })

    this.userUpdate = fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]],
      // userName: ['', [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20), Validators.required]],
      userType: ['']
    })
  }

  ngOnInit() {
  }

  add() {
    this.flag = 1;
  }
  // this.registerForm.value
  addUser() {
    if (this.user.valid === true) {
      this.showError = false;
      this.connect.PostUser(this.user.value).subscribe(res => {
        this.flag = 0;
        if (res.data != "exist") {
          alert("User has been added");
          this.getUsers();
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      this.showError = true;
    }

  }

  getUsers() {
    this.connect.getUsers().subscribe(res =>
      this.users = res
    )
  }

  edit(id) {
    this.flagEdit = 1;
    this.userid = id;
    // this.getUsers();
    // for(this.input=0;this.input<this.users.length;this.input++){
    //   if(this.users[this.input]._id==this.userid){
    //     console.log("hey its working")
    //   }
    // }
  }

  editDetails() {
    this.connect.editUser(this.userUpdate.value).subscribe(res => {
      alert("edited")
    }
      , error => {
        alert(error);
      });
  }

  DeleteUser(_id) {
    var sure = confirm("Are you sure to delete this user?");
    if (sure == true) {
      this.connect.deleteUser(_id).subscribe(res => {
        alert("Deleted");
        this.getUsers();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("User cannot be deleted!");
    }

  }


}
