import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../../core/validators/confirmPasswordValidator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { birthDateValidator } from '../../../core/validators/birthDateValidator';

@Component({
  selector: 'app-profile-data-form',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FloatLabelModule, InputTextModule, PasswordModule],
  templateUrl: './profile-data-form.component.html',
  styleUrl: './profile-data-form.component.css'
})
export class ProfileDataFormComponent {
  @Input() userData: any = null;
  @Input() readonly: boolean = false;
  form = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      birthDate: new FormControl(null, Validators.required),
      gender: new FormControl("Male", Validators.required)
    },
    { validators: [confirmPasswordValidator, birthDateValidator] }
  );
  isFirstInput: boolean = true;
  get validFirstName() { return this.form.controls.firstName.valid; }
  get validLastName() { return this.form.controls.lastName.valid; }
  get validEmail() { return this.form.controls.email.valid; }
  get validPassword() { return this.form.controls.password.valid; }
  get validConfirmPassword() { return !this.form.errors?.['PasswordNoMatch']; }
  get validBirthDate() { return !this.form.errors?.['InvalidBirthDate']; }
  signIn() {
    this.isFirstInput = false;
    if (this.form.valid) {
    }
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
