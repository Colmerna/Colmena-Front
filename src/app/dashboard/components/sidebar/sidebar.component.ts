import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    template: `
    <div class="sidebar-container">
      <div class="logo-area">
        <h2>COLMENA</h2>
      </div>
      <nav class="nav-links">
        <a routerLink="/dashboard/home" routerLinkActive="active" class="nav-item">
          <i class="icon-home"></i> Inicio
        </a>
        <!-- Add more links here -->
      </nav>
    </div>
  `,
    styles: [`
    .sidebar-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
    .logo-area {
      margin-bottom: 40px;
      text-align: center;
    }
    .logo-area h2 {
      color: #1a237e;
      margin: 0;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .nav-item {
      padding: 12px 15px;
      border-radius: 8px;
      text-decoration: none;
      color: #546e7a;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
    }
    .nav-item:hover, .nav-item.active {
      background-color: #e8eaf6;
      color: #1a237e;
      font-weight: 500;
    }
  `]
})
export class SidebarComponent { }
