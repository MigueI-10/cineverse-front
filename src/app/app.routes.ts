import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'home',

        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
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
