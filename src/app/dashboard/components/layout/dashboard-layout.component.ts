import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="dashboard-container">
      <app-sidebar class="sidebar"></app-sidebar>
      <div class="main-content">
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }
    .sidebar {
      width: 250px;
      flex-shrink: 0;
      background-color: #fff;
      border-right: 1px solid #e0e0e0;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: #f5f7fa;
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
  `]
})
export class DashboardLayoutComponent { }
