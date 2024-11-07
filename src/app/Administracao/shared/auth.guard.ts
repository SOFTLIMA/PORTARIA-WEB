import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Verificando autenticação...');

  const session = await authService.getCurrentSession();
  console.log('Sessão:', session);

  if (session != undefined) {
    console.log('Usuário autenticado, acesso permitido.');
    return true; // Permite o acesso à rota
  } else {
    console.log('Usuário não autenticado, redirecionando...');
    router.navigate(['/login']);
    return false; // Bloqueia o acesso à rota
  }
};
