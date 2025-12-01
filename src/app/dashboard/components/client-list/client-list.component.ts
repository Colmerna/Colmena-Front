import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../infrastructure/services/client.service';
import { Client } from '../../domain/model/client.model';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  template: `
    <div class="client-list-container">
      <div class="page-header">
        <h1 class="page-title">Lista de Clientes registrados</h1>
        <!-- Debug info -->
        <div *ngIf="clients.length > 0" style="font-size: 10px; color: #666;">
            Clientes cargados: {{ clients.length }}
        </div>
        <app-ui-button 
          label="Nuevo cliente" 
          icon="+" 
          (onClick)="navigateToCreate()">
        </app-ui-button>
        <app-ui-button 
          label="Refrescar" 
          icon="refresh" 
          (onClick)="refresh()"
          style="margin-left: 10px;">
        </app-ui-button>
      </div>

      <div class="colmena-table-container">
        <table class="colmena-table">
          <thead>
            <tr>
              <th>ClientID</th>
              <th>Celular</th>
              <th>Income</th>
              <th>Situación</th>
              <th>Risk Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of clients">
              <td>{{ client.id }}</td>
              <td>{{ client.telefono }}</td>
              <td>{{ client.ingresoMensual | currency:'USD':'symbol':'1.0-0' }}/mes</td>
              <td>{{ client.situacionLaboral }}</td>
              <td>{{ client.scoreRiesgo }}</td>
              <td>
                <app-ui-button 
                  label="Ver cliente" 
                  (onClick)="viewClient(client)">
                </app-ui-button>
              </td>
            </tr>
            <tr *ngIf="clients.length === 0">
              <td colspan="6" style="text-align: center;">No hay clientes registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .client-list-container {
      padding: 20px;
    }
  `]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    console.log('Loading clients...');
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Clients loaded:', data);
        this.clients = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading clients', err);
        // Mock data for development if backend fails or is empty
        this.clients = [
          { id: 77788933, dni: '77788933', nombres: 'Juan', apellidos: 'Perez', telefono: '955448490', email: 'juan@example.com', ingresoMensual: 30000, dependientes: 0, scoreRiesgo: 21, gastoMensualAprox: 1000, usuarioId: 1, situacionLaboral: 'Empleado estable', estadoCivil: 'Soltero' },
          { id: 77788933, dni: '77788933', nombres: 'Maria', apellidos: 'Gomez', telefono: '955448490', email: 'maria@example.com', ingresoMensual: 30000, dependientes: 0, scoreRiesgo: 21, gastoMensualAprox: 1000, usuarioId: 1, situacionLaboral: 'Empleado estable', estadoCivil: 'Soltero' }
        ];
        this.cdr.detectChanges();
      }
    });
  }

  navigateToCreate() {
    this.router.navigate(['/dashboard/create-client']);
  }

  refresh() {
    this.loadClients();
  }

  viewClient(client: Client) {
    console.log('View client', client);
    this.router.navigate(['/dashboard/clients', client.id]);
  }
}
