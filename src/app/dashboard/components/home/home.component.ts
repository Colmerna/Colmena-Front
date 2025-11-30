import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="home-container">
      <div class="welcome-card">
        <h2>Bienvenido al Dashboard</h2>
        <p>Selecciona una opción del menú para comenzar.</p>
      </div>
    </div>
  `,
    styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .welcome-card {
      background-color: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .welcome-card h2 {
      margin-top: 0;
      color: #1a237e;
    }
    .welcome-card p {
      color: #546e7a;
    }
  `]
})
export class HomeComponent { }
