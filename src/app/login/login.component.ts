import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { signUp } from '../model/login-model';
import { InMemoryCache } from '../services/cache-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupPage: boolean = true;
  loginPage: boolean = false;
  signupForm: FormGroup = Object.create(null);
  loginForm: FormGroup = Object.create(null);
  showAlert: boolean = false;
  hide: boolean = true;
  loginCart = 'assets/images/login-cart.png'

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private store: InMemoryCache) { }

  ngOnInit(): void {

    //intalize signup form
    this.signupForm = this.fb.group({
      "profile": [null, Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])],
      "email": [null, Validators.compose([Validators.required])],
      "passcode": [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9]).{8,}$/)])],
    })

    //intalize login form
    this.loginForm = this.fb.group({
      "userName": [null, Validators.compose([Validators.required, Validators.email])],
      "password": [null, Validators.compose([Validators.required])],
    })
  }

  showSignupPage() {
    this.signupPage = true;
    this.loginPage = false;
    this.showAlert = false;
    this.resetForm();
  }

  showLoginPage() {
    this.signupPage = false;
    this.loginPage = true;
    this.showAlert = false;
    this.resetForm();
  }

  login() {

    if (this.loginForm.valid) {

      //retrieve all register user details.
      this.loginService.getRegisterUser().subscribe((data: any[]) => {

        // Extract login details from the form
        const loginDetails = {
          userName: this.loginForm.controls['userName'].value,
          password: this.loginForm.controls['password'].value
        };

        // Iterate through the array of registered users
        for (const user of data) {

          this.showAlert = false;

          // Check if the email and password match ie user all already logged in.
          if (user.email === loginDetails.userName && user.password === loginDetails.password) {
            console.log('Login successful');

            let userDetails = JSON.stringify(user)
            this.store.setItem("USER_DETAILS", userDetails)

            this.router.navigate(['mfa'],{ queryParams: { userName: this.loginForm.controls['userName'].value}})
            return;
          }

          // If no match found ie login details are anot valid / not registered.
          else {
            console.log('Invalid login credentials');
            this.showAlert = true;
          }
        }
      });
    }
  }


  //method for to restrict user to resitered using same email id.
  checkValidation(value: string) {
    let email = value ? value : "";

    if (email != "" && this.signupForm.controls['email'].valid) {

      //get all register details.
      this.loginService.getRegisterUser().subscribe((data: any) => {

        // check email id already exist or not using some method (Js method).
        let emailExists = data.some((user: any) => user.email === email);

        if (emailExists) {
          // Set an error for the email form control if email already exist.
          this.signupForm.controls['email'].setErrors({ 'emailExists': true });
        }
      });
    }
  }




  userOnboard() {

    if (this.signupForm.valid) {

      this.signupPage = false;
      this.loginPage = true;

      let payload: signUp = {
        'profile': this.signupForm.controls['profile'].value,
        'email': this.signupForm.controls['email'].value,
        'password': this.signupForm.controls['passcode'].value,
        'id': ""
      }

      this.loginService.userSignUp(payload);
    }

  }


  //reused method
  resetForm() {
    this.signupForm.reset();
    this.loginForm.reset();
    this.signupForm.clearValidators();
    this.signupForm.updateValueAndValidity();
    this.loginForm.clearValidators();
    this.loginForm.updateValueAndValidity();
  }
}
