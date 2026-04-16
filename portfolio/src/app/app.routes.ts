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
        path: '**',
        redirectTo: ''
    }
];
