import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AccountService } from '../services/Account/account.service';
import { map, of, switchMap, catchError } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const accountService = inject(AccountService);

  if (!accountService.isLoggedIn()) {
    router.navigate(['/sign-in']);
    return of(false);
  }

  return accountService.getUserSummary().pipe(
    switchMap(userSummary => {
      if (userSummary.userType?.role === "admin") {
        return of(true);
      } else {
        router.navigate(['/not-authorized']);
        return of(false);
      }
    }),
    catchError(() => {
      router.navigate(['/not-authorized']);
      return of(false);
    })
  );
};
