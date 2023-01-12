import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  logInForm!: any;
  user!: any;
  constructor(private router: Router, private _snackBar: MatSnackBar,private userService:UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false)
    });
  }


  logIn() {

    //todo'login'
    console.log(this.logInForm.value);
    if(this.logInForm.valid){
      this.searchUser();
    this.logInForm.reset();
  }
  }

  get email() {
    return this.logInForm.get('email');
  }

  get password() {
    return this.logInForm.get('password');
  }

  searchUser() {
    this.user = this.userService.findUser(this.logInForm.value.email, this.logInForm.value.password);
    
    if(this.user!=null)
    {
      alert(`Log In Successfully, ${this.user.firstName}`);
    this.router.navigateByUrl('table');
    this._snackBar.open('Log In Successfully!', '', {
      duration: 2000,
    });

    }
  }
  
}
