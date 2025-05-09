import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../../core/validators/confirmPasswordValidator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { birthDateValidator } from '../../../core/validators/birthDateValidator';
import { AccountService } from '../../../core/services/Account/account.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SignUpDto } from '../../../core/dtos/SignUpDto';

@Component({
  selector: 'app-profile-data-form',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputTextModule, PasswordModule, ToastModule],
  providers: [MessageService],
  templateUrl: './profile-data-form.component.html',
  styleUrl: './profile-data-form.component.css'
})
export class ProfileDataFormComponent {
  isLoading = false;
  @Input() userData: any = null;
  @Input() readonly: boolean = false;
  form = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      birthDate: new FormControl(null, [Validators.required]),
      gender: new FormControl("Male", Validators.required)
    },
    { validators: [confirmPasswordValidator, birthDateValidator] }
  );
  isFirstInput: boolean = true;
  @Input() isReadOnly: boolean = false;
  get validFirstName() { return this.form.controls.firstName.valid; }
  get validLastName() { return this.form.controls.lastName.valid; }
  get validEmail() { return this.form.controls.email.valid; }
  get validPassword() { return this.form.controls.password.valid; }
  get validConfirmPassword() { return !this.form.errors?.['PasswordNoMatch']; }
  get validBirthDate() { return !this.form.errors?.['InvalidBirthDate']; }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) { }

  register() {
    this.isFirstInput = false;

    // Debug form validation
    console.log('Form Values:', this.form.value);
    console.log('Form Valid:', this.form.valid);
    console.log('Form Errors:', this.form.errors);

    // Check each control's validity
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      console.log(`${key} valid:`, control?.valid);
      console.log(`${key} errors:`, control?.errors);
    });

    if (this.form.valid) {
      this.isLoading = true;
      const userData: SignUpDto = {
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        email: this.form.value.email!,
        Password: this.form.value.password!,
        birthDate: this.formatDate(this.form.value.birthDate!),
        gender: this.form.value.gender === 'Male' ? 1 : 2
      };

      this.accountService.register(userData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful! Please check your email for confirmation.'
          });
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Registration failed. Please try again.'
          });
        }
      });
    } else {
      // Show specific validation errors
      let errorMessage = 'Please fix the following errors:\n';
      if (!this.validFirstName) errorMessage += '- First name is invalid\n';
      if (!this.validLastName) errorMessage += '- Last name is invalid\n';
      if (!this.validEmail) errorMessage += '- Email is invalid\n';
      if (!this.validPassword) errorMessage += '- Password must be at least 6 characters\n';
      if (!this.validConfirmPassword) errorMessage += '- Passwords do not match\n';
      if (!this.validBirthDate) errorMessage += '- Birth date is invalid\n';

      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: errorMessage
      });
    }
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveChanges() {
    this.isFirstInput = false;
    if (this.form.valid) {
    }
  }

  openPicker(input: HTMLInputElement) {
    input.showPicker?.();
  }
}
