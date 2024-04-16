import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './guards/isNotAuthenticated.guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () => import('./components/layout-page/layout-page.component').then(c => c.LayoutPageComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
            },
            // Tus otras rutas aquí
        ]
    },
    {
        path: 'login',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'activate-account/:token',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./components/auth/activate-account/activate-account.component').then(c => c.ActivateAccountComponent)
    },
    {
        path: 'change-password',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./components/auth/change-password/change-password.component').then(c => c.ChangePasswordComponent)
    },
    {
        path: 'reset-password/:token',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./components/auth/confirm-password/confirm-password.component').then(c => c.ConfirmPasswordComponent)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () => import('./components/error404/error404.component').then(c => c.Error404Component)

    },
];
