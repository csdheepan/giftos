import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Login, SignUp } from 'src/app/core/model/login-model';
import { LoginService } from 'src/app/core/services/login.service';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

/**
 * Component responsible for handling user signup/login functionality.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupPage = true;
  loginPage = false;
  signupForm: FormGroup = this.fb.group(Object.create(null));
  loginForm: FormGroup = this.fb.group(Object.create(null));
  showAlert = false;
  hide = true;
  loader = false;
  showLoginButton = true;
  showSignupButton = true;
  loginCart = 'assets/images/login-cart.png';
  signupDetails !: SignUp;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private store: InMemoryCache
  ) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.signupForm = this.createSignupForm();
    this.loginForm = this.createLoginForm();
  }

  private createSignupForm(): FormGroup {
    return this.fb.group({
      profile: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.email]],
      passcode: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9]).{8,}$/)
      ]]
    });
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  showSignupPage(): void {
    this.signupPage = true;
    this.loginPage = false;
    this.showAlert = false;
    this.resetForm();
  }

  showLoginPage(): void {
    this.signupPage = false;
    this.loginPage = true;
    this.showAlert = false;
    this.resetForm();
  }

    /**
  * Attempt to login the user.
  * If the provided email and password match an existing registered user's credentials,
  * The user is authenticated and redirected to their profile page.
  * Otherwise, an error message is displayed indicating invalid login credentials.
  */
  login(): void {
    if (this.loginForm.invalid) return;

    this.showLoginButton = false;
    this.loader = true;

    setTimeout(() => {
      this.loginService.getRegisterUser().pipe(take(1)).subscribe((data: SignUp[]) => {
        this.showLoginButton = true;
        this.loader = false;
        const loginDetails: Login = this.loginForm.value;
        const user = data.find(user => user.email === loginDetails.userName && user.passcode === loginDetails.password);
        if (user) {
          console.log("Login Sucessfully");
          this.showAlert = false;
          this.store.setItem("USER_DETAILS", JSON.stringify(user));
          this.router.navigate(['auth/mfa'], { queryParams: { userName: this.loginForm.controls['userName'].value } });
        } else {
          console.log("Invalid Login Crendials");
          this.showAlert = true;
        }
      }, (err: any) => {
        this.showLoginButton = true;
        this.loader = false;
        console.log("Login Falied");
      });
    }, 1000);
  }

   /**
  * Check if the provided email already exists in the database.
  * This method is used to prevent conflicts and ensure uniqueness of email addresses.
  * If the email exists, an error is displayed to the user indicating that the email is already registered.
  * @param email The email to be checked for existence in the database.
  */
  checkValidation(email: string): void {
    if (email && this.signupForm.controls['email'].valid) {
      this.loginService.getRegisterUser().pipe(take(1)).subscribe((data: SignUp[]) => {
        const emailExists = data.some(user => user.email === email);
        if (emailExists) {
          this.signupForm.controls['email'].setErrors({ 'emailExists': true });
        }
      });
    }
  }

  /**
   * Create a new user account and store the details in the database.
   * The user's name, email, and password are obtained from the signup form,
   * and upon successful creation of the account, the user is redirected to the login page.
   */
  signUp(): void {
    if (this.signupForm.invalid) return;

    this.signupDetails = this.signupForm.value;
    this.signupDetails.id = "";

    this.showSignupButton = false;
    this.loader = true;
    setTimeout(() => {
      this.loginService.userSignUp(this.signupDetails).subscribe(() => {
        this.showSignupButton = true;
        this.loader = false;
        this.showLoginPage();
      },
        (err: any) => {
          console.log("Signup Falied");
          this.showSignupButton = true;
          this.loader = false;
        });
    }, 1000);
  }

  resetForm(): void {
    this.signupForm.reset();
    this.loginForm.reset();
  }
}
