import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces";
import { map } from "rxjs";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  
    const authService = inject(AuthService)
    const router      = inject(Router)
   
  
    return authService.checkAuthStatus().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Si el usuario está autenticado y es un administrador, permitir el acceso
          return true
        } else {
          // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
          router.navigateByUrl('/home');
          return false;
        }
      })
    );

    // const status = authService.authStatus();

    // if(status === AuthStatus.authenticated){
     
    //   return true;
    // }
  
    // if(status === AuthStatus.checking){
    //   router.navigateByUrl('/home')
    //   return false;
    // }
    // router.navigateByUrl('/login')
  
    // return false;
  };
  