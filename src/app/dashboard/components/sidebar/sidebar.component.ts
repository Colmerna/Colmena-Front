import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar-container bg-primary-blue">
      <div class="profile-area">
        <div class="profile-icon">
          <span class="material-icons">person</span>
        </div>
      </div>
      
      <nav class="nav-links">
        <a routerLink="/dashboard/clients" routerLinkActive="active" class="nav-item">
          <span class="material-icons">groups</span> Clientes
        </a>
        <a routerLink="/dashboard/projects" routerLinkActive="active" class="nav-item">
          <span class="material-icons">layers</span> Proyectos
        </a>
        <a routerLink="/dashboard/financing" routerLinkActive="active" class="nav-item">
          <span class="material-icons">bar_chart</span> Financiamiento
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      width: 250px;
    }
    .profile-area {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      padding-top: 20px;
    }
    .profile-icon {
      width: 80px;
      height: 80px;
      background-color: #ccc; /* Placeholder gray */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .profile-icon .material-icons {
      font-size: 50px;
      color: #fff;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .nav-item {
      padding: 15px 25px;
      text-decoration: none;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: all 0.3s ease;
      font-size: 1rem;
      font-weight: 500;
    }
    .nav-item .material-icons {
      font-size: 24px;
    }
    .nav-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .nav-item.active {
      background-color: var(--primary-yellow);
      color: var(--text-dark);
      border-left: 4px solid #fff; /* Optional accent */
    }
  `]
})
export class SidebarComponent { }
