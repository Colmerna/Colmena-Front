import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        SidebarComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
