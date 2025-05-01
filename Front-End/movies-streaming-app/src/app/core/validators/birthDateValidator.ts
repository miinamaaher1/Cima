import { AbstractControl, ValidationErrors } from "@angular/forms";

export function birthDateValidator(control: AbstractControl): ValidationErrors | null {
    console.log(new Date(Date.parse(control.value.birthDate)).getFullYear());
    return (new Date(Date.parse(control.value.birthDate)).getFullYear() ?? new Date().getFullYear()) - new Date().getFullYear() > 10
        ? null
        : { InvalidBirthDate: true };
};