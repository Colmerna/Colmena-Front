import { Component, OnInit } from '@angular/core';
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
        <h1 class="page-title">Financiamiento</h1>
        <app-ui-button 
          label="Nuevo financiamiento" 
          icon="+" 
          (onClick)="navigateToCreate()">
        </app-ui-button>
      </div>

      <div class="colmena-table-container">
        <table class="colmena-table">
          <thead>
            <tr>
              <th>CreditoID</th>
              <th>Monto</th>
              <th>Plazo (meses)</th>
              <th>Tasa Interés</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of financingList">
              <td>{{ item.id }}</td>
              <td>{{ item.montoPrestamo | currency:'USD':'symbol':'1.2-2' }}</td>
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
              <td colspan="6" style="text-align: center;">No hay financiamientos registrados.</td>
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
  `]
})
export class FinancingListComponent implements OnInit {
    financingList: Financing[] = [];

    constructor(
        private financingService: FinancingService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadFinancing();
    }

    loadFinancing() {
        this.financingService.getFinancingList().subscribe({
            next: (data) => {
                this.financingList = data;
            },
            error: (err) => {
                console.error('Error loading financing', err);
            }
        });
    }

    navigateToCreate() {
        this.router.navigate(['/dashboard/create-financing']);
    }

    viewDetail(item: Financing) {
        console.log('View detail', item);
    }
}
