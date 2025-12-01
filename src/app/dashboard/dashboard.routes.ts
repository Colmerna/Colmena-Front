import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { FinancingListComponent } from './components/financing-list/financing-list.component';
import { CreateFinancingComponent } from './components/create-financing/create-financing.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: 'clients', component: ClientListComponent },
            { path: 'create-client', component: CreateClientComponent },
            { path: 'clients/:id', component: ViewClientComponent },
            { path: 'projects', component: ProjectListComponent },
            { path: 'create-project', component: CreateProjectComponent },
            { path: 'projects/:id', component: ViewProjectComponent },
            { path: 'financing', component: FinancingListComponent },
            { path: 'create-financing', component: CreateFinancingComponent },
            { path: '', redirectTo: 'clients', pathMatch: 'full' }
        ]
    }
];
