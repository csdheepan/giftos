import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { InMemoryCache } from '../services/cache-services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {

  code!: number;
  generateCode!: number;
  showAlert: boolean = false;
  userName!: string;

  constructor(
    private emailService: EmailService,
    private store: InMemoryCache,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'];
    });

    this.generateVerificationCode();
    this.sendVerificationCode();
  }

  private generateVerificationCode(): void {
    this.generateCode = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).reduce((acc, digit) => acc * 10 + digit, 0);
  }

  private sendVerificationCode(): void {
    const mailContent = {
      to_name: this.userName,
      code: this.generateCode
    };
    this.emailService.generateCode(mailContent);
  }

  authentication(value: number): void {
    if (value === this.generateCode) {
      this.showAlert = false;
      this.store.setItem('USER_AUTH', "User Authenticated Successfully");
      this.router.navigate(["full/products"]);
    } else {
      this.showAlert = true;
    }
  }
}
