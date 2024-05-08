import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces";
import { map } from "rxjs";

export const isAdminGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const router      = inject(Router)

    // const user = authService.usrActual()

    // const rolUser = user?.roles[0]
    // console.log(rolUser);

    // if(rolUser === "admin"){
    //     return true;
    // } else {
    //     // Si el usuario no es un administrador, redirigirlo a la página de inicio
    //     router.navigateByUrl('/home');
    //     return false;
    // }

    // router.navigateByUrl('/home')
    // return false

    return authService.checkAuthStatus().pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            // Si el usuario está autenticado y es un administrador, permitir el acceso
            const user = authService.usrActual();
            const rolUser = user?.roles[0];
            if (rolUser === "admin") {
              return true;
            } else {
              // Si el usuario está autenticado pero no es un administrador, redirigirlo a la página de inicio
              router.navigateByUrl('/home');
              return false;
            }
          } else {
            // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
            router.navigateByUrl('/login');
            return false;
          }
        })
      );
};
  