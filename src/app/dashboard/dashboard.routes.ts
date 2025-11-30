import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';
import { HomeComponent } from './components/home/home.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent }
        ]
    }
];
