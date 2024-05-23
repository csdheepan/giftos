import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { InMemoryCache } from '../services/cache-services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit{

  code !: number;
  generateCode : number = 0;
  showAlert : boolean = false;
  userName !: string


  constructor(private emailService : EmailService,private store : InMemoryCache,private router : Router, private route: ActivatedRoute){}

  
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'];
    });
    
    let code = 0;

    for (let i = 0; i < 4; i++) {
        let digit = Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
        code = code * 10 + digit;
    }
    
    this.generateCode = code; 
    // console.log(this.generateCode)   
    
    const mailContent = {
      to_name:this.userName,
      code:this.generateCode
    }

    this.emailService.generateCode(mailContent)
  }

  authentication(value:number){

    if(value ==this.generateCode ){
      this.showAlert = false;
      this.router.navigate(["full/products"])
    }
    else{
      this.showAlert = true;
      console.log("Invalid code")
    }
  }

}
