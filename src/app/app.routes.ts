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
        loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'activate-account/:token',
        loadComponent: () => import('./components/auth/activate-account/activate-account.component').then(c => c.ActivateAccountComponent)
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
