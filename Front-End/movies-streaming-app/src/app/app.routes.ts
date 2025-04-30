import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/account/sign-in/sign-in.component';
import { SuccessPasswordComponent } from './components/account/success-password/success-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { EmailPasswordComponent } from './components/account/email-password/email-password.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { WatchAreaComponent } from './components/watch-page/watch-area/watch-area.component';

export const routes: Routes = [
    // { path: "", redirectTo: "home", title: "Home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "Home" },
    { path: "details", component: DetailsComponent, title: "Details" },
    { path: "watch", component: WatchAreaComponent, title: "watch"},
    { path: "**", component: NotFoundComponent, title: "Error" },
    { path: "profile", component: ProfileComponent, title: "profile" },
    { path: "sign-in", component:SignInComponent, title: "signin" },
    { path: "sign-up", component:SignUpComponent, title: "signup" },
    { path: "email-password", component:SignUpComponent, title: "email-password" },
    { path: "email-password", component:EmailPasswordComponent, title: "email-password" },
    { path: "forget-password", component:ForgotPasswordComponent, title: "success-password" },
    { path: "reset-password",   component:ResetPasswordComponent,   title: "reset-password" },
    { path: "change-password",  component:ChangePasswordComponent,  title: "change-password" },
    { path: "**", component: NotFoundComponent, title: "Error" }
];
