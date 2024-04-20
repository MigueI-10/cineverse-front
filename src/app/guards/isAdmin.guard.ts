import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces";

export const isAdminGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const router      = inject(Router)

    const user = authService.usrActual()

    const rolUser = user?.roles[0]

    if(rolUser === "admin"){
        return true;
    }

    router.navigateByUrl('/home')
    return false
};
  