import { Component } from '@angular/core';
import { ProfileDataFormComponent } from '../profile-data-form/profile-data-form.component';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IUser } from '../../../core/interfaces/IUser';
import { AccountService } from '../../../core/services/Account/account.service';
import { SubscriptionPlan } from '../../../core/interfaces/ISubscriptionData';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [ProfileDataFormComponent, LowerCasePipe, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user!: IUser;
  readyData: boolean = false;
  isSubscriptionValid: boolean = false;
  subscriptionType: string = "None";
  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    forkJoin({
      user: this.accountService.getUserInfo(),
      subscription: this.accountService.getSubscriptionData()
    }).subscribe({
      next: ({ user, subscription }) => {
        this.user = user;
        this.isSubscriptionValid = subscription.subscriptionState;
        this.subscriptionType = SubscriptionPlan[subscription.subscriptionType];
        this.readyData = true;
      },
      error: (error) => console.log(error)
    });
  }
}
