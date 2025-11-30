import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
