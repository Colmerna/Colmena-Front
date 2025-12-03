import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancingService } from '../../infrastructure/services/financing.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-view-financing',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  template: `
    <div class="view-financing-container">
      <div class="back-link" (click)="goBack()">
        <span class="material-icons">arrow_back</span> Volver a financiamiento
      </div>

      <div *ngIf="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>

      <div *ngIf="isLoading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando financiamiento...</p>
      </div>

      <div *ngIf="!isLoading && !errorMessage" class="form-card bg-primary-yellow">
        <h2 class="form-title">Detalles del Financiamiento</h2>

        <div class="form-grid">
          <!-- Left Column - Información Básica -->
          <div class="form-column">
            <h3 class="column-title">Información Básica</h3>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">person</span>
                ID Cliente
              </label>
              <div class="field-value">{{ financing?.clienteId || 'N/A' }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">home</span>
                ID Proyecto
              </label>
              <div class="field-value">{{ financing?.proyectoId || 'N/A' }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">account_balance</span>
                ID Banco
              </label>
              <div class="field-value">{{ financing?.bancoId || 'N/A' }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">attach_money</span>
                Moneda
              </label>
              <div class="field-value">{{ financing?.moneda === 'PEN' ? 'PEN - Soles' : 'USD - Dólares' }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">trending_up</span>
                Tipo de Tasa
              </label>
              <div class="field-value">{{ financing?.tipoTasa === 'NOMINAL' ? 'Nominal' : 'Efectiva' }}</div>
            </div>

            <div class="display-field" *ngIf="financing?.tipoTasa === 'NOMINAL'">
              <label class="field-label">
                <span class="material-icons">percent</span>
                Tasa Nominal
              </label>
              <div class="field-value">{{ ((financing?.tasaNominal || 0) * 100).toFixed(2) }}%</div>
            </div>

            <div class="display-field" *ngIf="financing?.tipoTasa === 'EFECTIVA'">
              <label class="field-label">
                <span class="material-icons">percent</span>
                Tasa Efectiva
              </label>
              <div class="field-value">{{ ((financing?.tasaEfectiva || 0) * 100).toFixed(2) }}%</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">calendar_today</span>
                Base de Tiempo
              </label>
              <div class="field-value">{{ getBaseTiempoLabel(financing?.baseTiempo) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">autorenew</span>
                Capitalización
              </label>
              <div class="field-value">{{ getCapitalizacionLabel(financing?.capitalizacion) }}</div>
            </div>
          </div>

          <!-- Right Column - Detalles Financieros -->
          <div class="form-column">
            <h3 class="column-title">Detalles Financieros</h3>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">sell</span>
                Precio Venta del Activo
              </label>
              <div class="field-value">{{ formatCurrency(financing?.precioVentaActivo || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">attach_money</span>
                Monto del Préstamo
              </label>
              <div class="field-value">{{ formatCurrency(financing?.montoPrestamo || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">payments</span>
                Cuota Inicial
              </label>
              <div class="field-value">{{ formatCurrency(financing?.cuotaInicial || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">eco</span>
                Bono Techo Verde
              </label>
              <div class="field-value">{{ formatCurrency(financing?.bonoTecho || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">schedule</span>
                Plazo
              </label>
              <div class="field-value">{{ financing?.plazoMeses || 0 }} meses</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">event_repeat</span>
                Frecuencia de Pago
              </label>
              <div class="field-value">{{ financing?.frecuenciaPagoDias || 0 }} días</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">today</span>
                Días por Año
              </label>
              <div class="field-value">{{ financing?.diasPorAnio || 0 }}</div>
            </div>
          </div>
        </div>

        <!-- Costos Iniciales Section -->
        <div class="section">
          <h3 class="section-title">Costos Iniciales</h3>
          <div class="section-grid">
            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">description</span>
                Costos Notariales
              </label>
              <div class="field-value">{{ formatCurrency(financing?.costosNotariales || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">app_registration</span>
                Costos Registrales
              </label>
              <div class="field-value">{{ formatCurrency(financing?.costosRegistrales || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">fact_check</span>
                Tasación
              </label>
              <div class="field-value">{{ formatCurrency(financing?.tasacion || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">search</span>
                Comisión de Estudio
              </label>
              <div class="field-value">{{ formatCurrency(financing?.comisionEstudio || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">power_settings_new</span>
                Comisión de Activación
              </label>
              <div class="field-value">{{ formatCurrency(financing?.comisionActivacion || 0) }}</div>
            </div>
          </div>
        </div>

        <!-- Costos Periódicos Section -->
        <div class="section">
          <h3 class="section-title">Costos Periódicos</h3>
          <div class="section-grid">
            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">sync</span>
                Comisión Periódica
              </label>
              <div class="field-value">{{ formatCurrency(financing?.comisionPeriodica || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">local_shipping</span>
                Portes
              </label>
              <div class="field-value">{{ formatCurrency(financing?.portes || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">admin_panel_settings</span>
                Gastos Administrativos Periódicos
              </label>
              <div class="field-value">{{ formatCurrency(financing?.gastosAdmPeriodicos || 0) }}</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">security</span>
                % Seguro de Desgravamen
              </label>
              <div class="field-value">{{ ((financing?.porcentajeSeguroDesgravamen || 0) * 100).toFixed(2) }}%</div>
            </div>

            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">shield</span>
                % Seguro de Riesgo
              </label>
              <div class="field-value">{{ ((financing?.porcentajeSeguroRiesgo || 0) * 100).toFixed(2) }}%</div>
            </div>
          </div>
        </div>

        <!-- Otros Section -->
        <div class="section">
          <h3 class="section-title">Otros</h3>
          <div class="section-grid">
            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">discount</span>
                Tasa de Descuento Anual
              </label>
              <div class="field-value">{{ ((financing?.tasaDescuentoAnual || 0) * 100).toFixed(2) }}%</div>
            </div>
          </div>
        </div>

        <!-- Período de Gracia Section -->
        <div class="section">
          <h3 class="section-title">Período de Gracia</h3>
          <div class="section-grid">
            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">access_time</span>
                Tipo de Gracia
              </label>
              <div class="field-value">{{ getGraciaTipoLabel(financing?.graciaTipo) }}</div>
            </div>

            <div class="display-field" *ngIf="financing?.graciaTipo !== 'SIN_GRACIA'">
              <label class="field-label">
                <span class="material-icons">event_available</span>
                Meses de Gracia
              </label>
              <div class="field-value">{{ financing?.graciaMeses || 0 }} meses</div>
            </div>
          </div>
        </div>

        <!-- Estado Section -->
        <div class="section">
          <h3 class="section-title">Estado</h3>
          <div class="section-grid">
            <div class="display-field">
              <label class="field-label">
                <span class="material-icons">info</span>
                Estado del Crédito
              </label>
              <div class="field-value">
                <span class="status-badge" [ngClass]="getStatusClass(financing?.estadoCredito)">
                  {{ financing?.estadoCredito || 'N/A' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-container"> 
  <app-ui-button 
    label="Volver" 
    type="button"
    [fullWidth]="false"
    class="back-btn"
    (click)="goBack()">
  </app-ui-button>

  <!-- Si no tiene cuotas → Generar -->
  <app-ui-button 
    *ngIf="!hasCuotas"
    label="Generar Cuotas" 
    type="button"
    class="view-credits-btn"
    (click)="generateCuotas()">
  </app-ui-button>

  <!-- Si ya tiene cuotas → Ver -->
  <app-ui-button 
    *ngIf="hasCuotas"
    label="Ver Cuotas" 
    type="button"
    class="view-credits-btn"
    (click)="viewCredits()">
  </app-ui-button>
</div>

      </div>
    </div>
  `,
  styles: [`
    .view-financing-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      font-weight: 600;
      color: var(--primary-blue);
      transition: opacity 0.2s;
    }
    .back-link:hover {
      opacity: 0.7;
    }
    .form-card {
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .form-title {
      color: var(--primary-blue);
      margin-bottom: 25px;
      font-size: 1.8rem;
      font-weight: 700;
      text-align: center;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;
    }
    .form-column {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .column-title {
      color: var(--primary-blue);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--primary-blue);
    }
    .section {
      margin-bottom: 30px;
      padding: 25px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 12px;
    }
    .section-title {
      color: var(--primary-blue);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--primary-blue);
    }
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .display-field {
      margin-bottom: 15px;
    }
    .field-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--primary-blue);
      font-size: 0.95rem;
    }
    .field-label .material-icons {
      font-size: 20px;
      opacity: 0.7;
    }
    .field-value {
      padding: 12px 15px 12px 45px;
      border: 2px solid var(--primary-blue);
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.7);
      color: var(--text-dark);
      font-size: 1rem;
      font-weight: 500;
      position: relative;
    }
    .field-value::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
    }
    .status-badge.pendiente {
      background-color: #fff3cd;
      color: #856404;
    }
    .status-badge.aprobado {
      background-color: #d4edda;
      color: #155724;
    }
    .status-badge.rechazado {
      background-color: #f8d7da;
      color: #721c24;
    }
    .status-badge.activo {
      background-color: #d1ecf1;
      color: #0c5460;
    }
    .button-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid rgba(59, 130, 246, 0.2);
    }
    ::ng-deep .back-btn .ui-button {
      background-color: var(--primary-blue) !important;
      color: white !important;
      padding-left: 60px;
      padding-right: 60px;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    ::ng-deep .back-btn .ui-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    ::ng-deep .view-credits-btn .ui-button {
      background-color: #10b981 !important;
      color: white !important;
      padding-left: 60px;
      padding-right: 60px;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    ::ng-deep .view-credits-btn .ui-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      background-color: #059669 !important;
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
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 20px;
    }
    .spinner {
      border: 4px solid rgba(59, 130, 246, 0.1);
      border-top: 4px solid var(--primary-blue);
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
      color: var(--primary-blue);
      font-size: 1.1rem;
      font-weight: 500;
    }
    @media (max-width: 968px) {
      .form-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .section-grid {
        grid-template-columns: 1fr;
      }
      .form-card {
        padding: 20px;
      }
    }
    @media (max-width: 640px) {
      .view-financing-container {
        padding: 10px;
      }
      .form-title {
        font-size: 1.4rem;
      }
      .column-title, .section-title {
        font-size: 1rem;
      }
    }
  `]
})
export class ViewFinancingComponent implements OnInit {
  financing: any = null;
  errorMessage: string = '';
  isLoading: boolean = true;
  financingId: number = 0;
  hasCuotas: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private financingService: FinancingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.financingId = +params['id'];

      if (this.financingId) {
        this.loadFinancing();
      } else {
        this.errorMessage = 'ID de financiamiento no válido';
        this.isLoading = false;
      }
    });
  }

  loadFinancing() {
    this.isLoading = true;
    this.errorMessage = '';
    
    
    this.financingService.getFinancingById(this.financingId).subscribe({
      next: (response: any) => {
  
        this.financing = response;
        this.isLoading = false;
        this.cdr.detectChanges();

      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMessage = 'Financiamiento no encontrado';
        } else {
          this.errorMessage = 'Error al cargar el financiamiento';
        }
        this.cdr.detectChanges();
      }
    });

    this.checkIfHasCuotas();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(value || 0);
  }

  getBaseTiempoLabel(value: string): string {
    if (!value) return 'N/A';
    const labels: { [key: string]: string } = {
      'ANUAL_360': 'Anual 360 días',
      'ANUAL_365': 'Anual 365 días',
      'MES_30': 'Mes 30 días'
    };
    return labels[value] || value;
  }

  getCapitalizacionLabel(value: string): string {
    if (!value) return 'N/A';
    const labels: { [key: string]: string } = {
      'DIARIA': 'Diaria',
      'SEMANAL': 'Semanal',
      'QUINCENAL': 'Quincenal',
      'MENSUAL': 'Mensual',
      'BIMESTRAL': 'Bimestral',
      'TRIMESTRAL': 'Trimestral',
      'SEMESTRAL': 'Semestral',
      'ANUAL': 'Anual'
    };
    return labels[value] || value;
  }

  getGraciaTipoLabel(value: string): string {
    if (!value) return 'N/A';
    const labels: { [key: string]: string } = {
      'SIN_GRACIA': 'Sin Gracia',
      'GRACIA_TOTAL': 'Gracia Total',
      'GRACIA_PARCIAL': 'Gracia Parcial'
    };
    return labels[value] || value;
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    const statusMap: { [key: string]: string } = {
      'PENDIENTE': 'pendiente',
      'APROBADO': 'aprobado',
      'RECHAZADO': 'rechazado',
      'ACTIVO': 'activo'
    };
    return statusMap[status] || '';
  }

  goBack() {
    this.router.navigate(['/dashboard/financing']);
  }

  viewCredits() {
    this.router.navigate(['/dashboard/credits', this.financingId]);
  }
generateCuotas() {
  if (!this.financingId) {
    this.errorMessage = 'ID de financiamiento no válido';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  this.financingService.simulateCredit(this.financingId).subscribe({
    next: (resp) => {

      this.isLoading = false;

      this.router.navigate(['/dashboard/credits', this.financingId]);
    },
    error: (err) => {
      this.isLoading = false;

      this.errorMessage = err?.error?.message || 'Error al generar cuotas';
      this.cdr.detectChanges();
    }
  });

}

checkIfHasCuotas() {
  this.financingService.getCuotasByCredit(this.financingId).subscribe({
    next: (resp) => {

      this.hasCuotas = Array.isArray(resp) && resp.length > 0;

      this.cdr.detectChanges();
    },
    error: () => {
      this.hasCuotas = false;
      this.cdr.detectChanges();
    }
  });
}

}