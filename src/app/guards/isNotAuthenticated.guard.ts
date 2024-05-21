import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStatus } from "../interfaces";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const router      = inject(Router)

    
  //authService.authStatus()
  // console.log(authService.authStatus());
  //   if(authService.authStatus() === AuthStatus.authenticated){
  //     router.navigateByUrl('/home')
  //     return false;
  //   }
  
  //   return true;

  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {
      // console.log(isAuthenticated);
      if (isAuthenticated) {
        // Si el usuario está autenticado y es un administrador, permitir el acceso
        router.navigateByUrl('/home');
        return false
      } else {
        // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
        
        return true;
      }
    })
  );
  
  };
  