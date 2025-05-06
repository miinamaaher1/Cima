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
import { SubscribePageComponent } from './components/subscribe/subscribe-page/subscribe-page.component';
import { authGuard } from './core/services/Guards/auth.guard';


export const routes: Routes = [
    { path: "", redirectTo: "home", title: "Home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "Home" },
    { path: 'details/:type/:id', component: DetailsComponent, title: 'Details' },
    { path: "watch/:type/:id", component: WatchAreaComponent, title: "watch", canActivate: [authGuard] },
    { path: "subscribe", component: SubscribePageComponent, title: "subscribe" },
    { path: "profile", component: ProfileComponent, title: "profile", canActivate: [authGuard] },
    { path: "sign-in", component: SignInComponent, title: "Sign In" },
    { path: "sign-up", component: SignUpComponent, title: "Sign Up" },
    { path: "email-password", component: EmailPasswordComponent, title: "Check Your Email" },
    { path: "success-password", component: SuccessPasswordComponent, title: "Password Changed", canActivate: [authGuard] },
    { path: "forget-password", component: ForgotPasswordComponent, title: "Forget Password", canActivate: [authGuard] },
    { path: "reset-password", component: ResetPasswordComponent, title: "Reset Password", canActivate: [authGuard] },
    { path: "change-password", component: ChangePasswordComponent, title: "Change Password", canActivate: [authGuard] },
    { path: "**", component: NotFoundComponent, title: "Error" }
];