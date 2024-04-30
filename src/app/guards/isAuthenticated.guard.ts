import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

    // const url = state.url
    // localStorage.setItem('url', url)
  
    const authService = inject(AuthService)
    const router      = inject(Router)
   
  
    const status = authService.authStatus();

    if(status === AuthStatus.authenticated){
     
      return true;
    }
  
    if(status === AuthStatus.checking){
      router.navigateByUrl('/home')
      return false;
    }
    router.navigateByUrl('/login')
  
    return false;
  };
  