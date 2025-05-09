import { AbstractControl, ValidationErrors } from "@angular/forms";

export function birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = control.get('birthDate')?.value;
    if (!birthDate) return null;
    
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    
    return age > 10 ? null : { InvalidBirthDate: true };
}