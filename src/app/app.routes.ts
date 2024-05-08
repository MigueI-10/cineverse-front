import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './guards/isNotAuthenticated.guard';
import { isAuthenticatedGuard } from './guards/isAuthenticated.guard';
import { isAdminGuard } from './guards/isAdmin.guard';

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
                path: 'busqueda',
                loadComponent: () => import('./components/media/media-search/media-search.component').then(c => c.MediaSearchComponent)
            },
            {
                path: 'filtros',
                loadComponent: () => import('./components/media/media-filters/media-filters.component').then(c => c.MediaFiltersComponent)
            },
            {
                path: 'favoritos/:id',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./components/favorites/favorites.component').then(c => c.FavoritesComponent)
            },
            {
                path: 'ratings/:id',
                canActivate: [isAuthenticatedGuard],
                loadComponent: () => import('./components/ratings/ratings.component').then(c => c.RatingsComponent)
            },
            {
                path: 'media/:id',
                loadComponent: () => import('./components/media/media/media.component').then(c => c.MediaComponent)
            },
            {
                path: 'actor/:id',
                loadComponent: () => import('./components/actores/actor/actor.component').then(c => c.ActorComponent)
            },
            {
                path: 'about',
                loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent)
            },
            {
                path: 'help',
                loadComponent: () => import('./components/help/help.component').then(c => c.HelpComponent)
            },
            {
                path: 'media-crud',
                canActivate: [isAdminGuard],
                loadComponent: () => import('./components/media/media-crud/media-crud.component').then(c => c.MediaCrudComponent)
            },
            { //para añadir normal
                path:'media-frm', 
                canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/media/media-frm/media-frm.component').then(c=>c.MediaFrmComponent)
            },
            { //para añadir normal
                path:'media-frm/:id', 
                canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/media/media-frm/media-frm.component').then(c=>c.MediaFrmComponent)
            },
            //Rutas de Actores Admin
            {
                path: 'actores-crud',
                canActivate: [isAdminGuard],
                loadComponent: () => import('./components/actores/act-crud/act-crud.component').then(c => c.ActCrudComponent)
            },
            { //para añadir normal
                path:'actores-frm', 
                canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/actores/act-form/act-form.component').then(c=>c.ActFormComponent)
            },
            { //para añadir normal
                path:'actores-frm/:id', 
                canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/actores/act-form/act-form.component').then(c=>c.ActFormComponent)
            },
            { //para añadir normal
                path:'comentarios', 
                 canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/comentarios/comentarios.component').then(c=>c.ComentariosComponent)
            },
            { //para añadir normal
                path:'user-list', 
                 canActivate: [isAdminGuard],
                loadComponent: ()=>import('./components/auth/user-list/user-list.component').then(c=>c.UserListComponent)
            },
            
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
