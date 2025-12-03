import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancingService } from '../../infrastructure/services/financing.service';

@Component({
  selector: 'app-credit-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="credit-results-container">
      <!-- Header con botón de volver -->
      <div class="header">
        <button class="back-button" (click)="goBack()">
          <span class="material-icons">arrow_back</span>
          Volver a crédito
        </button>
      </div>

      <!-- Título del crédito -->
      <h1 class="credit-title">Resultados del Crédito</h1>

      <!-- Loading de resultados -->
      <div *ngIf="isLoadingResults" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando resultados...</p>
      </div>

      <!-- Tabla de Resultados Financieros -->
      <div *ngIf="!isLoadingResults && resultados" class="results-section">
        <h2 class="section-title">Resumen Financiero</h2>
        
        <div class="results-grid">
          <!-- Columna 1: Cuotas y Totales -->
          <div class="results-card">
            <h3 class="card-title">Cuotas y Totales</h3>
            <div class="result-item">
              <span class="result-label">Cuota Base</span>
              <span class="result-value highlight">{{ formatCurrency(resultados.cuotaBase) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Total Intereses</span>
              <span class="result-value">{{ formatCurrency(resultados.totalIntereses) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Total Amortización</span>
              <span class="result-value">{{ formatCurrency(resultados.totalAmortizacion) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Total Pagado</span>
              <span class="result-value highlight-success">{{ formatCurrency(resultados.totalPagado) }}</span>
            </div>
          </div>

          <!-- Columna 2: Seguros y Comisiones -->
          <div class="results-card">
            <h3 class="card-title">Seguros y Comisiones</h3>
            <div class="result-item">
              <span class="result-label">Seguro Desgravamen</span>
              <span class="result-value">{{ formatCurrency(resultados.totalSeguroDesgravamen) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Seguro Riesgo</span>
              <span class="result-value">{{ formatCurrency(resultados.totalSeguroRiesgo) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Comisiones</span>
              <span class="result-value">{{ formatCurrency(resultados.totalComisiones) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Portes y Gastos</span>
              <span class="result-value">{{ formatCurrency(resultados.totalPortesGastos) }}</span>
            </div>
          </div>

          <!-- Columna 3: Indicadores Financieros -->
          <div class="results-card">
            <h3 class="card-title">Indicadores Financieros</h3>
            <div class="result-item">
              <span class="result-label">VAN</span>
              <span class="result-value highlight-success">{{ formatCurrency(resultados.van) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">TIR</span>
              <span class="result-value">{{ formatPercentage(resultados.tir) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">TEA</span>
              <span class="result-value">{{ formatPercentage(resultados.tea) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">TCEA</span>
              <span class="result-value">{{ formatPercentage(resultados.tcea) }}</span>
            </div>
          </div>

          <!-- Columna 4: Flujos -->
          <div class="results-card">
            <h3 class="card-title">Análisis de Flujos</h3>
            <div class="result-item">
              <span class="result-label">Costo Total Final</span>
              <span class="result-value highlight">{{ formatCurrency(resultados.costoTotalFinal) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">% Ingreso</span>
              <span class="result-value">{{ formatPercentage(resultados.porcentajeIngreso / 100) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Flujo Total</span>
              <span class="result-value">{{ formatCurrency(resultados.flujoTotal) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Saldo Final Flujo</span>
              <span class="result-value highlight-success">{{ formatCurrency(resultados.saldoFinalFlujo) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Separador -->
      <div class="divider"></div>

      <!-- Título de la tabla de cuotas -->
      <h2 class="section-title">Detalle de Cuotas</h2>

      <!-- Loading de cuotas -->
      <div *ngIf="isLoading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando cuotas...</p>
      </div>

      <!-- Error -->
      <div *ngIf="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>

      <!-- Tabla de cuotas -->
      <div *ngIf="!isLoading && !errorMessage && cuotas.length > 0" class="table-container">
        <table class="cuotas-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Fecha Pago</th>
              <th>TEP</th>
              <th>TEA</th>
              <th>Saldo Inicial</th>
              <th>Interés</th>
              <th>Cuota</th>
              <th>Amortización</th>
              <th>Seguro Desgravamen</th>
              <th>Seguro Riesgo</th>
              <th>Comisión</th>
              <th>Gastos Adm.</th>
              <th>Saldo Final</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cuota of cuotas; let i = index" [class.grace-period]="cuota.tipoCuota === 'GRACIA'">
              <td class="text-center">{{ cuota.periodo }}</td>
              <td class="text-center">{{ cuota.fechaPago | date:'dd/MM/yyyy' }}</td>
              <td class="text-right">{{ (cuota.tasaEfectivaPeriodo * 100).toFixed(4) }}%</td>
              <td class="text-right">{{ (cuota.tasaEfectivaAnual * 100).toFixed(2) }}%</td>
              <td class="text-right">{{ formatCurrency(cuota.saldoInicial) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.interes) }}</td>
              <td class="text-right font-bold">{{ formatCurrency(cuota.cuotaTotal) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.amortizacionCap) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.seguroDesgravamen) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.seguroInmueble) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.comision || 0) }}</td>
              <td class="text-right">{{ formatCurrency(cuota.gastosAdm || 0) }}</td>
              <td class="text-right font-bold">{{ formatCurrency(cuota.saldoFinal) }}</td>
              <td class="text-center">
                <span [class.status-badge]="true" [class.status-pending]="cuota.estadoCuotas === 'PENDIENTE'" [class.status-paid]="cuota.estadoCuotas === 'PAGADO'">
                  {{ cuota.estadoCuotas }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mensaje cuando no hay cuotas -->
      <div *ngIf="!isLoading && !errorMessage && cuotas.length === 0" class="no-data">
        <span class="material-icons">info</span>
        <p>No se encontraron cuotas para este crédito</p>
      </div>
    </div>
  `,
  styles: [`
    .credit-results-container {
      padding: 20px;
      max-width: 1600px;
      margin: 0 auto;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      color: #003d82;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .back-button:hover {
      opacity: 0.7;
    }

    .back-button .material-icons {
      font-size: 20px;
    }

    .credit-title {
      color: #003d82;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .section-title {
      color: #111827;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .results-section {
      margin-bottom: 40px;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .results-card {
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #fbbf24;
    }

    .card-title {
      color: #003d82;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f3f4f6;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-label {
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .result-value {
      color: #111827;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .result-value.highlight {
      color: #fbbf24;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .result-value.highlight-success {
      color: #10b981;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .divider {
      height: 2px;
      background: linear-gradient(to right, #fbbf24, #f59e0b);
      margin: 40px 0;
      border-radius: 2px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 20px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .spinner {
      border: 4px solid rgba(0, 61, 130, 0.1);
      border-top: 4px solid #003d82;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-container p {
      color: #003d82;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .error-alert {
      background-color: #fee;
      color: #c33;
      padding: 15px 20px;
      margin-bottom: 20px;
      border: 2px solid #fcc;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
    }

    .error-alert::before {
      content: '⚠️';
      font-size: 1.2rem;
    }

    .table-container {
      background: white;
      border-radius: 15px;
      overflow-x: auto;
      overflow-y: visible;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .table-container::-webkit-scrollbar {
      height: 12px;
    }

    .table-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 0 0 15px 15px;
    }

    .table-container::-webkit-scrollbar-thumb {
      background: #fbbf24;
      border-radius: 10px;
      border: 2px solid #f1f1f1;
    }

    .table-container::-webkit-scrollbar-thumb:hover {
      background: #f59e0b;
    }

    .cuotas-table {
      width: 100%;
      min-width: 1400px;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .cuotas-table thead {
      background: #fbbf24;
    }

    .cuotas-table th {
      padding: 15px 12px;
      text-align: left;
      font-weight: 700;
      color: #111827;
      border-bottom: 2px solid #f59e0b;
    }

    .cuotas-table tbody tr {
      border-bottom: 1px solid #e5e7eb;
      transition: background-color 0.2s;
    }

    .cuotas-table tbody tr:hover {
      background-color: #f9fafb;
    }

    .cuotas-table tbody tr.grace-period {
      background-color: #fef3c7;
    }

    .cuotas-table td {
      padding: 12px;
      color: #374151;
    }

    .text-center {
      text-align: center;
    }

    .text-right {
      text-align: right;
    }

    .font-bold {
      font-weight: 700;
      color: #111827;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-pending {
      background-color: #fef3c7;
      color: #92400e;
    }

    .status-paid {
      background-color: #d1fae5;
      color: #065f46;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 15px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .no-data .material-icons {
      font-size: 48px;
      color: #9ca3af;
    }

    .no-data p {
      color: #6b7280;
      font-size: 1.1rem;
    }

    @media (max-width: 1200px) {
      .results-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }

      .table-container {
        overflow-x: auto;
      }

      .cuotas-table {
        min-width: 1400px;
      }
    }

    @media (max-width: 768px) {
      .credit-results-container {
        padding: 10px;
      }

      .header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .results-grid {
        grid-template-columns: 1fr;
      }

      .credit-title {
        font-size: 1.5rem;
      }

      .cuotas-table {
        min-width: 1600px;
      }

      .table-container::-webkit-scrollbar {
        height: 8px;
      }
    }
  `]
})
export class CreditsResultComponent implements OnInit {
  creditId: number = 0;
  
  // Resultados financieros
  resultados: any = null;
  isLoadingResults: boolean = true;
  
  // Cuotas
  cuotas: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private financingService: FinancingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.creditId = +params['id'];
      if (this.creditId) {
        this.loadResultados();
        this.loadCuotas();
      } else {
        this.errorMessage = 'ID de crédito no válido';
        this.isLoading = false;
        this.isLoadingResults = false;
      }
    });
  }

  loadResultados() {
    this.isLoadingResults = true;
    
    this.financingService.getCreditResults(this.creditId).subscribe({
      next: (response: any) => {
        this.resultados = response;
        this.isLoadingResults = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoadingResults = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCuotas() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.financingService.getCuotasByCredit(this.creditId).subscribe({
      next: (response: any) => {
        this.cuotas = response || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMessage = 'No se encontraron cuotas para este crédito';
        } else {
          this.errorMessage = 'Error al cargar las cuotas';
        }
        this.cdr.detectChanges();
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(value || 0).replace('PEN', 'S/');
  }

  formatPercentage(value: number): string {
    return `${(value * 100).toFixed(2)}%`;
  }

  goBack() {
    this.router.navigate(['/dashboard/financing']);
  }
}