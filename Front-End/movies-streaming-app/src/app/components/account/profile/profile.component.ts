import { Component } from '@angular/core';
import { ProfileDataFormComponent } from '../profile-data-form/profile-data-form.component';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ProfileDataFormComponent, LowerCasePipe, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  birthDate: string = "";
  gender: string = "";
  isSubscriptionValid: boolean = true;
  subscriptionType: string = "None";
  ngOnInit(): void {

  }
}
