import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('userToken');

  if (!isAuthenticated) {
    router.navigate(['/sign-in']);
    return false;
  }

  return true;
};