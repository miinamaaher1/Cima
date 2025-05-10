import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/Account/account.service';
import { SignInDto } from '../../../core/dtos/SignInDto';

@Component({
  selector: 'app-sign-in',
  imports: [FloatLabelModule, FormsModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  signInSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const signInData: SignInDto = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    };

    this.accountService.login(signInData).subscribe({
      next: (response) => {
        if (!response.token) {
          this.signInForm.setErrors({ login: true });
          return;
        }
        this.accountService.getUserSummary().subscribe();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Login failed:', error);
        alert('Login failed');
      }
    });
  }
}
