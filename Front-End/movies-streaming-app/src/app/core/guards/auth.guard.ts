import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if we're in a browser environment where sessionStorage is available
  const isSessionStorageAvailable = typeof window !== 'undefined' && window.sessionStorage;
  const isAuthenticated = isSessionStorageAvailable ? !!sessionStorage.getItem('userToken') : false;

  if (!isAuthenticated) {
    router.navigate(['/sign-in']);
    return false;
  }

  return true;
};