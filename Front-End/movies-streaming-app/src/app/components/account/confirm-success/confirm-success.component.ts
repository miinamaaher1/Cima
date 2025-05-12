import { AccountService } from './../../../core/services/Account/account.service';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-success',
  imports: [CommonModule],
  templateUrl: './confirm-success.component.html',
})
export class ConfirmSuccessComponent implements OnInit {
  isLoading: boolean = true;
  isSuccess = signal(false);
  errorMessage = '';
  countdown = 5;
  private countdownInterval: any;

  constructor(
    private Router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { email, token } = params;
      if (!token || !email) {
        this.handleError('Invalid confirmation link');
        return;
      }

      this.accountService.confirmEmail(email, token).subscribe({
        next: (response) => {
          if (response === true) {
            this.isSuccess.set(true);
            this.isLoading = false;
            this.startCountdown();
          } else {
            this.handleError('Email confirmation failed. Please try again.');
          }
        },
        error: (error) => {
          this.handleError('An error occurred. Please try again later.');
        }
      });
    });
  }

  private handleError(message: string) {
    this.isLoading = false;
    this.isSuccess.set(false);
    this.errorMessage = message;
  }

  private startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.Router.navigate(['/home']);
      }
    }, 1000);
  }

  navigateToHome() {
    clearInterval(this.countdownInterval);
    this.Router.navigate(['/home']);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
