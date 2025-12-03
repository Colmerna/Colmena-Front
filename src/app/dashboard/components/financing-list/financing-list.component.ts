import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FinancingService } from '../../infrastructure/services/financing.service';
import { Financing } from '../../domain/model/financing.model';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
    selector: 'app-financing-list',
    standalone: true,
    imports: [CommonModule, UiButtonComponent],
    template: `
    <div class="financing-list-container">
      <div class="page-header">
        <h1 class="page-title">Lista de Financiamientos registrados</h1>
        <!-- Debug info -->
        <div *ngIf="financingList.length > 0" style="font-size: 10px; color: #666;">
            Financiamientos cargados: {{ financingList.length }}
        </div>
        <app-ui-button 
          label="Nuevo financiamiento" 
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
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Proyecto ID</th>
              <th>Monto Préstamo</th>
              <th>Plazo (meses)</th>
              <th>Tasa Interés</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of financingList">
              <td>{{ item.id }}</td>
              <td>{{ item.clienteId }}</td>
              <td>{{ item.proyectoId }}</td>
              <td>{{ item.montoPrestamo | currency:'USD':'symbol':'1.0-0' }}</td>
              <td>{{ item.plazoMeses }}</td>
              <td>{{ item.tasaInteresAnual }}%</td>
              <td>{{ item.estadoCredito }}</td>
              <td>
                <app-ui-button 
                  label="Ver detalle" 
                  (onClick)="viewDetail(item)">
                </app-ui-button>
              </td>
            </tr>
            <tr *ngIf="financingList.length === 0">
              <td colspan="8" style="text-align: center;">No hay financiamientos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .financing-list-container {
      padding: 20px;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 10px;
    }

    .page-title {
      margin: 0;
      flex: 1;
    }
  `]
})
export class FinancingListComponent implements OnInit {
    financingList: Financing[] = [];

    constructor(
        private financingService: FinancingService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadFinancing();
    }

    loadFinancing() {
        console.log('Loading financing...');
        this.financingService.getFinancingList().subscribe({
            next: (data: any) => {
                console.log('Raw financing data:', data);
                
                // Mapear los datos del backend a tu interfaz
                this.financingList = data.map((item: any) => ({
                    id: item.id,
                    montoPrestamo: item.montoPrestamo,
                    tasaInteresAnual: this.calculateTasaInteresAnual(item),
                    plazoMeses: item.plazoMeses,
                    fechaInicio: item.fechaInicio || new Date().toISOString(),
                    clienteId: item.clienteId,
                    proyectoId: item.proyectoId,
                    bancoId: item.bancoId,
                    seguroDesgravamenMensual: item.seguroDesgravamenMensual || 0,
                    seguroInmuebleAnual: item.seguroInmuebleAnual || 0,
                    estadoCredito: item.estadoCredito
                }));
                
                console.log('Mapped financing list:', this.financingList);
                console.log('Number of financing:', this.financingList.length);
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading financing:', err);
            }
        });
    }

    calculateTasaInteresAnual(item: any): number {
        // Si tiene tasa nominal, la usamos
        if (item.tipoTasa === 'NOMINAL' && item.tasaNominal !== null) {
            return Number((item.tasaNominal * 100).toFixed(2));
        }
        // Si tiene tasa efectiva, la usamos
        if (item.tipoTasa === 'EFECTIVA' && item.tasaEfectiva !== null) {
            return Number((item.tasaEfectiva * 100).toFixed(2));
        }
        return 0;
    }

    navigateToCreate() {
        this.router.navigate(['/dashboard/create-financing']);
    }

    refresh() {
        this.financingList = [];
        this.cdr.detectChanges();
        this.loadFinancing();
    }

    viewDetail(item: Financing) {
        console.log('View detail', item);
        this.router.navigate(['/dashboard/financing', item.id]);
    }
}