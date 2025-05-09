import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
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
import { MediaListComponent } from './components/dashboard/media-list/media-list.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { WatchLayoutComponent } from './layouts/watch-layout/watch-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { UploadMediaComponent } from './components/dashboard/upload-media/upload-media.component';
import { GenresComponent } from './pages/genres/genres.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { PaymentSuccessComponent } from './components/account/payment-success/payment-success.component';
import { ConfirmSuccessComponent } from './components/account/confirm-success/confirm-success.component';


export const routes: Routes = [

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
      { path: 'home', component: HomeComponent, title: 'Home', },
      { path: 'genres', component: GenresComponent, title: 'Genres' },
      { path: 'charts', component: ChartsComponent, title: 'Charts' },
      { path: 'my-lists', component: MyListsComponent, title: 'My Lists' },
      { path: 'details/:type/:id', component: DetailsComponent, title: 'Details' },
      { path: 'subscribe', component: SubscribePageComponent, title: 'Subscribe' },
      { path: 'profile', component: ProfileComponent, title: 'Profile', canActivate: [authGuard] },
      { path: 'sign-in', component: SignInComponent, title: 'Sign In' },
      { path: 'sign-up', component: SignUpComponent, title: 'Sign Up' },
      { path: 'email-password', component: EmailPasswordComponent, title: 'Check Your Email' },
      { path: 'success-password', component: SuccessPasswordComponent, title: 'Password Changed' },
      { path: 'payment-success', component: PaymentSuccessComponent, title: 'Payment Successful' },
      { path: 'confirm-success', component: ConfirmSuccessComponent, title: 'Email Confirmation Successful' },
      { path: 'forget-password', component: ForgotPasswordComponent, title: 'Forget Password' },
      { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Password' },
      { path: 'change-password', component: ChangePasswordComponent, title: 'Change Password' },
      { path: 'confirm-success', component: ConfirmSuccessComponent, title: 'Confirm Success' },
    ],

  },
  {
    path: '',
    component: WatchLayoutComponent,
    children: [
      { path: 'watch/:type/:id', component: WatchAreaComponent, title: 'Watch', canActivate: [authGuard] }
    ]
  },

  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full', title: 'Analytics' },
      { path: 'analytics', component: AnalyticsComponent, title: 'Analytics' },
      { path: 'upload-media', component: UploadMediaComponent, title: 'Upload Media' },
      { path: 'media-list', component: MediaListComponent, title: 'Media List' }
    ],
  },

  {
    path: '**',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: NotFoundComponent, title: 'Error' }
    ]
  }
];

