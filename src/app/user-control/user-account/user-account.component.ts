import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {


  userDetailsForm: FormGroup = Object.create(null);
  userDetail : any

  constructor(private fb: FormBuilder,private userService : UserService,private store : InMemoryCache,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.userDetailsForm = this.fb.group({
      firstName:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      street: ['', Validators.required],
      city:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      state:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      zip: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    });

    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));

    this.userService.getUserDetails(this.userDetail.id).subscribe((data:any)=>{
      this.userDetailsForm.patchValue({
        firstName : data[0] ? data[0].firstName: '',
        lastName : data[0]  ?  data[0].lastName  : '',
        email : data[0] ? data[0].email : this.userDetail.email,
        phone : data[0] ? data[0].phone : "",
        street : data[0]  ?  data[0].street  : '',
        city : data[0]  ?  data[0].city  : '',
        state : data[0]  ?  data[0].state  : '',
        country : data[0]  ?  data[0].country  : '',
        zip : data[0]  ?  data[0].zip  : '',
        gender : data[0] ?  data[0].gender  : '',
      })
    })

  }

  onSubmit(){

    if(this.userDetailsForm.valid){
      const userDetails={
        firstName: this.userDetailsForm.controls['firstName'].value,
        lastName:this.userDetailsForm.controls['lastName'].value,
        email:this.userDetailsForm.controls['email'].value,
        phone: this.userDetailsForm.controls['phone'].value,
        street:this.userDetailsForm.controls['street'].value,
        city: this.userDetailsForm.controls['city'].value,
        state:this.userDetailsForm.controls['state'].value,
        country : this.userDetailsForm.controls['country'].value,
        zip:this.userDetailsForm.controls['zip'].value,
        gender: this.userDetailsForm.controls['gender'].value,
      }
      this.userService.userDetails(userDetails,this.userDetail.id);

      this.snackBar.open(`User Details saved successfully`, 'Close', {
        duration: 4000, //Duration in milliseconds (5 seconds)
      });
    }
  }
}
