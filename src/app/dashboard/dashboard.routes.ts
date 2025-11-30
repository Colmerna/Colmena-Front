import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'clients', pathMatch: 'full' },
            { path: 'home', redirectTo: 'clients', pathMatch: 'full' },
            { path: 'clients', component: ClientListComponent },
            { path: 'create-client', component: CreateClientComponent }
        ]
    }
];
