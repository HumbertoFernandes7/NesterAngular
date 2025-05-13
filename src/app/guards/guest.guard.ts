import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const loginSerivce = inject(LoginService);
  const router = inject(Router);

  if (loginSerivce.isLoggedIn()) {
    router.navigate(['/feed']);
    return false;
  }
  return true;
};
