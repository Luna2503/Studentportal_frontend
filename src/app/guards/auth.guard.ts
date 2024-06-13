import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router)

  if (authService.islogged()) {
    return true;
  }
  else {
    Swal.fire({
      title: "warning",
      text: "Please login",
      icon: "warning"
    });
    router.navigateByUrl("")
    return false;
  }
};
