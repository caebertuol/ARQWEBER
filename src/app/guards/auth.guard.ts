// src/app/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o 'currentUserValue' existir (usuário está logado), o guarda libera o acesso.
  if (authService.currentUserValue) {
    return true;
  }

  // Se não, o guarda redireciona para a página de login e bloqueia o acesso.
  router.navigate(['/login']);
  return false;
};