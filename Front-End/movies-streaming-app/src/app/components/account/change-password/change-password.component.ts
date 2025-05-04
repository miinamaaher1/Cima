import { AbstractControl } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  imports:
  [
    FloatLabelModule
    ,FormsModule,InputTextModule
    ,PasswordModule,ReactiveFormsModule
  ],

  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {


  changeForm:FormGroup = new FormGroup(
    {

      currentPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{8,}$/)]),
      newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword:new FormControl(null),

    },
    this.checkConfirmPassword
  );


  changeSubmit() {
  this.changeForm.markAllAsTouched();
    console.log(this.changeForm);

}
checkConfirmPassword(g:AbstractControl){
  if (g.get('newPassword')?.value ==g.get('confirmPassword')?.value ) {
    return null
  }

  return {mismatch: true};
}


}
