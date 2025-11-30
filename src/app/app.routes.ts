import { Routes } from '@angular/router';
import { LoginComponent } from './usuarios/components/login/login.component';
import { RegisterComponent } from './usuarios/components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
