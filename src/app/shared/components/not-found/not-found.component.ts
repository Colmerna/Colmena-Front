import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="not-found-container">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <a routerLink="/dashboard" class="home-link">Volver al Dashboard</a>
    </div>
  `,
    styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f5f7fa;
      color: #333;
    }
    h1 {
      font-size: 6rem;
      margin: 0;
      color: var(--primary-blue);
    }
    p {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    .home-link {
      padding: 10px 20px;
      background-color: var(--primary-yellow);
      color: #333;
      text-decoration: none;
      border-radius: 20px;
      font-weight: 600;
    }
  `]
})
export class NotFoundComponent { }
