import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing/landing.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'about',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/about/about.component')
    },
    {
        path: 'videojuegos',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/videojuegos/videojuegos.component')
    },
    {
        path: 'libros',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/libros/libros.component')
    },
];
