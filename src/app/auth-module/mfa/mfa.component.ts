import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {
  code!: number;
  generatedCode!: number;
  showAlert: boolean = false;
  userName!: string;

  constructor(
    private emailService: EmailService,
    private store: InMemoryCache,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'];
    });

    this.generateVerificationCode();
    this.sendVerificationCode();
  }

  /**
   * Generate a random five-digit verification code.
   */
  private generateVerificationCode(): void {
    this.generatedCode = Math.floor(10000 + Math.random() * 90000);
  }

  /**
   * Send an email to the user with the generated verification code.
   */
  private sendVerificationCode(): void {
    const mailContent = {
      to_name: this.userName,
      code: this.generatedCode
    };
    this.emailService.generateCode(mailContent);
  }

  /**
   * Authenticate the user based on the provided code.
   * @param value The code entered by the user.
   */
  authenticate(value: number): void {
    if (value === this.generatedCode) {
      this.showAlert = false;
      this.store.setItem('USER_AUTH', "User Authenticated Successfully");
      this.router.navigate(["user/full/products"]);
    } else {
      this.showAlert = true;
    }
  }
}
