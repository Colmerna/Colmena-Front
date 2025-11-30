import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header class="header-container">
      <div class="page-title">
        <h1>Dashboard</h1>
      </div>
      <div class="user-actions">
        <span class="user-name">Usuario</span>
        <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
      </div>
    </header>
  `,
    styles: [`
    .header-container {
      height: 70px;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
    }
    .page-title h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    .user-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .user-name {
      font-weight: 500;
      color: #333;
    }
    .logout-btn {
      padding: 8px 16px;
      background-color: transparent;
      border: 1px solid #d32f2f;
      color: #d32f2f;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .logout-btn:hover {
      background-color: #d32f2f;
      color: #fff;
    }
  `]
})
export class HeaderComponent {
    constructor(private router: Router) { }

    logout() {
        // Implement logout logic here (clear tokens, etc.)
        this.router.navigate(['/login']);
    }
}
