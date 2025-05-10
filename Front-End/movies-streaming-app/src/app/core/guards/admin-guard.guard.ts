import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AccountService } from '../services/Account/account.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userService = inject(UserService);
  const accountService = inject(AccountService)

  if (userService.isLoggedIn()) {
    accountService.getUserType().subscribe({
      next: res => {
        if (res.role == "admin") {
          return true
        } else {
          router.navigate(['/not-authorized']);
          return false
        }
      },
      error: err => {
        router.navigate(['/not-authorized']);
        return false
      }
    })
  }
  router.navigate(['/sign-in']);
  return false;



};
