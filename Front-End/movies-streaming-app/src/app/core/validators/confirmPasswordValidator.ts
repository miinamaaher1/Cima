import { AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return control.value.password === control.value.confirmPassword
        ? null
        : { PasswordNoMatch: true };
};