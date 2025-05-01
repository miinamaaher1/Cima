import { AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  imports: [FloatLabelModule,FormsModule,InputTextModule,
            PasswordModule,ReactiveFormsModule
            ,RouterLink
          ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {




  resetForm:FormGroup = new FormGroup(
    {
      password:new FormControl(null,
        [Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword:new FormControl(null),
     
    },
    this.checkConfirmPassword
  );

  
resetSubmit() {
  this.resetForm.markAllAsTouched();
    console.log(this.resetForm);
  
}
checkConfirmPassword(g:AbstractControl){
  if (g.get('password')?.value ==g.get('confirmPassword')?.value ) {
    return null
  }
  
  return {mismatch: true};
}


}
