import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { log } from 'node:console';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  imports: [FloatLabelModule,FormsModule,InputTextModule,PasswordModule,ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {

value:string ="";

signInForm:FormGroup = new FormGroup(
  {
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  
  }
);

signInSubmit() {
  this.signInForm.markAllAsTouched()
console.log(this.signInForm);
}


}
