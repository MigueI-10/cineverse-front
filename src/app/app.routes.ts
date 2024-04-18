import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './guards/isNotAuthenticated.guard';
import { isAuthenticatedGuard } from './guards/isAuthenticated.guard';

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
            {
                path: 'media/:id',
                loadComponent: () => import('./components/media/media/media.component').then(c => c.MediaComponent)
            },
            {
                path: 'media-crud',
                loadComponent: () => import('./components/media/media-crud/media-crud.component').then(c => c.MediaCrudComponent)
            },
            { //para añadir normal
                path:'media-frm', 
                loadComponent: ()=>import('./components/media/media-frm/media-frm.component').then(c=>c.MediaFrmComponent)
            },
            { //para añadir normal
                path:'media-frm/:id', 
                loadComponent: ()=>import('./components/media/media-frm/media-frm.component').then(c=>c.MediaFrmComponent)
            },
            //Rutas de Actores Admin
            {
                path: 'actores-crud',
                loadComponent: () => import('./components/actores/act-crud/act-crud.component').then(c => c.ActCrudComponent)
            },
            { //para añadir normal
                path:'actores-frm', 
                loadComponent: ()=>import('./components/actores/act-form/act-form.component').then(c=>c.ActFormComponent)
            },
            { //para añadir normal
                path:'actores-frm/:id', 
                loadComponent: ()=>import('./components/actores/act-form/act-form.component').then(c=>c.ActFormComponent)
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
