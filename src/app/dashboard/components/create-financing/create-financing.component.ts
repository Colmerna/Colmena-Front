import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancingService } from '../../infrastructure/services/financing.service';
import { ClientService } from '../../infrastructure/services/client.service';
import { ProjectService } from '../../infrastructure/services/project.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';


@Component({
  selector: 'app-create-financing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiInputComponent],
  template: `
    <div class="create-financing-container">
  <div class="back-link" (click)="goBack()">
    <span class="material-icons">arrow_back</span> Volver a financiamiento
  </div>

  <div class="form-card bg-primary-yellow">
    <h2 class="form-title">Crear nuevo financiamiento</h2>
    
    <div *ngIf="errorMessage" class="error-alert">
        {{ errorMessage }}
    </div>

    <div *ngIf="successMessage" class="success-alert">
        {{ successMessage }}
    </div>

    <form [formGroup]="financingForm" (ngSubmit)="onSubmit()">
      <div class="form-grid">
        <!-- Left Column - Información Básica -->
        <div class="form-column">
          <h3 class="column-title">Información Básica</h3>

          <div class="input-container">
            <label class="input-label">Cliente</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">person</span>
              <select formControlName="clienteId" class="ui-select">
                <option [value]="null" disabled>Seleccionar cliente</option>
                <option *ngFor="let client of clients" [value]="client.id">
                  ID: {{ client.id }} | Nombre: {{ client.nombres }} {{ client.apellidos }}
                </option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('clienteId')">{{ getErrorMessage('clienteId') }}</span>
          </div>

          <div class="input-container">
            <label class="input-label">Proyecto</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">home</span>
              <select formControlName="proyectoId" class="ui-select">
                <option [value]="null" disabled>Seleccionar proyecto</option>
                <option *ngFor="let project of projects" [value]="project.id">
                  ID: {{ project.id }} | Nombre: {{ project.nombre }}
                </option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('proyectoId')">{{ getErrorMessage('proyectoId') }}</span>
          </div>

          <div class="input-container">
            <label class="input-label">Banco</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">account_balance</span>
              <select formControlName="bancoId" class="ui-select" [disabled]="true">
                <option value="1">BCP</option>
              </select>
            </div>
          </div>

          <div class="input-container">
            <label class="input-label">Moneda</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">attach_money</span>
              <select formControlName="moneda" class="ui-select">
                <option value="PEN">PEN - Soles</option>
                <option value="USD">USD - Dólares</option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('moneda')">{{ getErrorMessage('moneda') }}</span>
          </div>

          <div class="input-container">
            <label class="input-label">Tipo de Tasa</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">trending_up</span>
              <select formControlName="tipoTasa" class="ui-select" (change)="onTipoTasaChange()">
                <option value="NOMINAL">Nominal</option>
                <option value="EFECTIVA">Efectiva</option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('tipoTasa')">{{ getErrorMessage('tipoTasa') }}</span>
          </div>

          <app-ui-input 
            *ngIf="financingForm.get('tipoTasa')?.value === 'NOMINAL'"
            label="Tasa Nominal (decimal, ej: 0.10 = 10%)" 
            placeholder="Ej: 0.10" 
            icon="percent"
            type="number"
            step="0.0001"
            formControlName="tasaNominal"
            [errorMessage]="isFieldInvalid('tasaNominal') ? getErrorMessage('tasaNominal') : ''">
          </app-ui-input>

          <app-ui-input 
            *ngIf="financingForm.get('tipoTasa')?.value === 'EFECTIVA'"
            label="Tasa Efectiva (decimal, ej: 0.10 = 10%)" 
            placeholder="Ej: 0.10" 
            icon="percent"
            type="number"
            step="0.0001"
            formControlName="tasaEfectiva"
            [errorMessage]="isFieldInvalid('tasaEfectiva') ? getErrorMessage('tasaEfectiva') : ''">
          </app-ui-input>

          <div class="input-container">
            <label class="input-label">Base de Tiempo</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">calendar_today</span>
              <select formControlName="baseTiempo" class="ui-select">
                <option value="ANUAL_360">Anual 360 días</option>
                <option value="ANUAL_365">Anual 365 días</option>
                <option value="MES_30">Mes 30 días</option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('baseTiempo')">{{ getErrorMessage('baseTiempo') }}</span>
          </div>

          <div class="input-container">
            <label class="input-label">Capitalización</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">autorenew</span>
              <select formControlName="capitalizacion" class="ui-select">
                <option value="DIARIA">Diaria</option>
                <option value="SEMANAL">Semanal</option>
                <option value="QUINCENAL">Quincenal</option>
                <option value="MENSUAL">Mensual</option>
                <option value="BIMESTRAL">Bimestral</option>
                <option value="TRIMESTRAL">Trimestral</option>
                <option value="SEMESTRAL">Semestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('capitalizacion')">{{ getErrorMessage('capitalizacion') }}</span>
          </div>
        </div>

        <!-- Right Column - Detalles Financieros -->
        <div class="form-column">
          <h3 class="column-title">Detalles Financieros</h3>

<app-ui-input 
  label="Precio Venta del Activo"
  placeholder="Precio de venta"
  icon="sell"
  type="number"
  step="0.01"
  formControlName="precioVentaActivo"
  [readonly]="true"
  [errorMessage]="isFieldInvalid('precioVentaActivo') ? getErrorMessage('precioVentaActivo') : ''">
</app-ui-input>

          <app-ui-input 
            label="Cuota Inicial (decimal, ej: 0.20 = 20%)" 
            placeholder="Ej: 0.20" 
            icon="payments"
            type="number"
            step="0.01"
            formControlName="cuotaInicial"
            [errorMessage]="isFieldInvalid('cuotaInicial') ? getErrorMessage('cuotaInicial') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Bono Techo Propio" 
            placeholder="Bono" 
            icon="eco"
            type="number"
            step="0.01"
            formControlName="bonoTecho"
            [errorMessage]="isFieldInvalid('bonoTecho') ? getErrorMessage('bonoTecho') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Plazo (meses)" 
            placeholder="Plazo en meses" 
            icon="schedule"
            type="number"
            formControlName="plazoMeses"
            [errorMessage]="isFieldInvalid('plazoMeses') ? getErrorMessage('plazoMeses') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Frecuencia de Pago (días)" 
            placeholder="Ej: 30 para mensual" 
            icon="event_repeat"
            type="number"
            formControlName="frecuenciaPagoDias"
            [errorMessage]="isFieldInvalid('frecuenciaPagoDias') ? getErrorMessage('frecuenciaPagoDias') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Días por Año" 
            placeholder="Ej: 360 o 365" 
            icon="today"
            type="number"
            formControlName="diasPorAnio"
            [errorMessage]="isFieldInvalid('diasPorAnio') ? getErrorMessage('diasPorAnio') : ''">
          </app-ui-input>
        </div>
      </div>

      <!-- Costos Iniciales Section -->
      <div class="section">
        <h3 class="section-title">Costos Iniciales</h3>
        <div class="section-grid">
          <app-ui-input 
            label="Costos Notariales" 
            placeholder="0.00" 
            icon="description"
            type="number"
            step="0.01"
            formControlName="costosNotariales"
            [errorMessage]="isFieldInvalid('costosNotariales') ? getErrorMessage('costosNotariales') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Costos Registrales" 
            placeholder="0.00" 
            icon="app_registration"
            type="number"
            step="0.01"
            formControlName="costosRegistrales"
            [errorMessage]="isFieldInvalid('costosRegistrales') ? getErrorMessage('costosRegistrales') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Tasación" 
            placeholder="0.00" 
            icon="fact_check"
            type="number"
            step="0.01"
            formControlName="tasacion"
            [errorMessage]="isFieldInvalid('tasacion') ? getErrorMessage('tasacion') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Comisión de Estudio" 
            placeholder="0.00" 
            icon="search"
            type="number"
            step="0.01"
            formControlName="comisionEstudio"
            [errorMessage]="isFieldInvalid('comisionEstudio') ? getErrorMessage('comisionEstudio') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Comisión de Activación" 
            placeholder="0.00" 
            icon="power_settings_new"
            type="number"
            step="0.01"
            formControlName="comisionActivacion"
            [errorMessage]="isFieldInvalid('comisionActivacion') ? getErrorMessage('comisionActivacion') : ''">
          </app-ui-input>
        </div>
      </div>

      <!-- Costos Periódicos Section -->
      <div class="section">
        <h3 class="section-title">Costos Periódicos</h3>
        <div class="section-grid">
          <app-ui-input 
            label="Comisión Periódica" 
            placeholder="0.00" 
            icon="sync"
            type="number"
            step="0.01"
            formControlName="comisionPeriodica"
            [errorMessage]="isFieldInvalid('comisionPeriodica') ? getErrorMessage('comisionPeriodica') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Portes" 
            placeholder="0.00" 
            icon="local_shipping"
            type="number"
            step="0.01"
            formControlName="portes"
            [errorMessage]="isFieldInvalid('portes') ? getErrorMessage('portes') : ''">
          </app-ui-input>

          <app-ui-input 
            label="Gastos Administrativos Periódicos" 
            placeholder="0.00" 
            icon="admin_panel_settings"
            type="number"
            step="0.01"
            formControlName="gastosAdmPeriodicos"
            [errorMessage]="isFieldInvalid('gastosAdmPeriodicos') ? getErrorMessage('gastosAdmPeriodicos') : ''">
          </app-ui-input>

          <app-ui-input 
            label="% Seguro de Desgravamen (decimal)" 
            placeholder="Ej: 0.05" 
            icon="security"
            type="number"
            step="0.0001"
            formControlName="porcentajeSeguroDesgravamen"
            [errorMessage]="isFieldInvalid('porcentajeSeguroDesgravamen') ? getErrorMessage('porcentajeSeguroDesgravamen') : ''">
          </app-ui-input>

          <app-ui-input 
            label="% Seguro de Riesgo (decimal)" 
            placeholder="Ej: 0.03" 
            icon="shield"
            type="number"
            step="0.0001"
            formControlName="porcentajeSeguroRiesgo"
            [errorMessage]="isFieldInvalid('porcentajeSeguroRiesgo') ? getErrorMessage('porcentajeSeguroRiesgo') : ''">
          </app-ui-input>
        </div>
      </div>

      <!-- Otros Section -->
      <div class="section">
        <h3 class="section-title">Otros</h3>
        <div class="section-grid">
          <app-ui-input 
            label="Tasa de Descuento Anual (decimal)" 
            placeholder="Ej: 0.12" 
            icon="discount"
            type="number"
            step="0.0001"
            formControlName="tasaDescuentoAnual"
            [errorMessage]="isFieldInvalid('tasaDescuentoAnual') ? getErrorMessage('tasaDescuentoAnual') : ''">
          </app-ui-input>
        </div>
      </div>

      <!-- Período de Gracia Section -->
      <div class="section">
        <h3 class="section-title">Período de Gracia</h3>
        <div class="section-grid">
          <div class="input-container">
            <label class="input-label">Tipo de Gracia</label>
            <div class="select-wrapper">
              <span class="input-icon material-icons">access_time</span>
              <select formControlName="graciaTipo" class="ui-select" (change)="onGraciaTipoChange()">
                <option value="SIN_GRACIA">Sin Gracia</option>
                <option value="GRACIA_TOTAL">Gracia Total</option>
                <option value="GRACIA_PARCIAL">Gracia Parcial</option>
              </select>
            </div>
            <span class="error-text" *ngIf="isFieldInvalid('graciaTipo')">{{ getErrorMessage('graciaTipo') }}</span>
          </div>

          <app-ui-input
          *ngIf="financingForm.get('graciaTipo')?.value !== 'SIN_GRACIA'"
        label="Meses de Gracia" 
        placeholder="Meses" 
        icon="event_available"
        type="number"
        formControlName="graciaMeses"
        [errorMessage]="isFieldInvalid('graciaMeses') ? getErrorMessage('graciaMeses') : ''">
      </app-ui-input>
    </div>
  </div>

  <!-- Submit Button -->
  <div class="button-container">
    <app-ui-button 
      label="Crear Financiamiento" 
      type="submit"
      [fullWidth]="false"
      class="create-btn"
      [disabled]="financingForm.invalid || isSubmitting">
    </app-ui-button>
  </div>
</form>
</div></div>

  `,
    styles: [`
    .create-financing-container {
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
    .input-container {
      margin-bottom: 15px;
    }
    .input-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--primary-blue);
      font-size: 0.95rem;
    }
    .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 15px;
      color: var(--text-dark);
      opacity: 0.7;
      pointer-events: none;
      z-index: 1;
      font-size: 20px;
    }
    .ui-select {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 2px solid var(--primary-blue);
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.5);
      color: var(--text-dark);
      font-size: 1rem;
      outline: none;
      appearance: none;
      cursor: pointer;
      transition: all 0.3s ease;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 15px center;
      padding-right: 40px;
    }
    .ui-select:hover {
      background-color: rgba(255, 255, 255, 0.7);
      border-color: var(--primary-blue);
    }
    .ui-select:focus {
      border-width: 2px;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid rgba(59, 130, 246, 0.2);
    }
    ::ng-deep .create-btn .ui-button {
      background-color: var(--primary-blue) !important;
      color: white !important;
      padding-left: 60px;
      padding-right: 60px;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    ::ng-deep .create-btn .ui-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    ::ng-deep .create-btn .ui-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
    .success-alert {
      background-color: #efe;
      color: #2a2;
      padding: 15px 20px;
      margin-bottom: 20px;
      border: 2px solid #cec;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
    }
    .success-alert::before {
      content: '✅';
      font-size: 1.2rem;
    }
    .error-text {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 5px;
      display: block;
      padding-left: 15px;
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
      .create-financing-container {
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

export class CreateFinancingComponent implements OnInit {
  financingForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  clients: any[] = [];
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private financingService: FinancingService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.financingForm = this.fb.group({
      // Información básica
      clienteId: [null, [Validators.required, Validators.min(1)]],
      proyectoId: [null, [Validators.required, Validators.min(1)]],
      bancoId: [1],
      moneda: ['PEN', Validators.required],
      
      // Tasas
      tipoTasa: ['NOMINAL', Validators.required],
      tasaNominal: [0, [Validators.required, Validators.min(0)]],
      tasaEfectiva: [0, [Validators.min(0)]],
      baseTiempo: ['ANUAL_360', Validators.required],
      capitalizacion: ['DIARIA', Validators.required],
      
      // Financiamiento
      precioVentaActivo: ['', [Validators.required, Validators.min(0)]],
      cuotaInicial: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      bonoTecho: [0, [Validators.required, Validators.min(10000), Validators.max(46000)]],
      plazoMeses: [0, [Validators.required, Validators.min(1)]],
     
      // Gracia
      graciaTipo: ['SIN_GRACIA', Validators.required],
      graciaMeses: [0, [Validators.required, Validators.min(0)]],
      
      // Costos iniciales
      costosNotariales: [0, [Validators.required, Validators.min(0)]],
      costosRegistrales: [0, [Validators.required, Validators.min(0)]],
      tasacion: [0, [Validators.required, Validators.min(0)]],
      comisionEstudio: [0, [Validators.required, Validators.min(0)]],
      comisionActivacion: [0, [Validators.required, Validators.min(0)]],
      
      // Costos periódicos
      comisionPeriodica: [0, [Validators.required, Validators.min(0)]],
      portes: [0, [Validators.required, Validators.min(0)]],
      gastosAdmPeriodicos: [0, [Validators.required, Validators.min(0)]],
      porcentajeSeguroDesgravamen: [0, [Validators.required, Validators.min(0)]],
      porcentajeSeguroRiesgo: [0, [Validators.required, Validators.min(0)]],
      
      // Otros
      tasaDescuentoAnual: [0, [Validators.required, Validators.min(0)]],
      frecuenciaPagoDias: [30, [Validators.required, Validators.min(1)]],
      diasPorAnio: [360, [Validators.required, Validators.min(1)]],
      
      // Estado
      estadoCredito: ['PENDIENTE', Validators.required]
    });

    this.onTipoTasaChange();
    this.onGraciaTipoChange();
    this.setupMontoPrestamoCalculation();
    this.setupProyectoListener();
  }

  ngOnInit() {
    this.loadClients();
    this.loadProjects();
  }

  setupProyectoListener() {
    this.financingForm.get('proyectoId')?.valueChanges.subscribe(id => {
      this.updatePrecioVentaActivo(id);
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        console.log('Proyectos cargados:', projects);
      },
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.errorMessage = 'Error al cargar la lista de proyectos';
      }
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        console.log('Clientes cargados:', clients);
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.errorMessage = 'Error al cargar la lista de clientes';
      }
    });
  }

  updatePrecioVentaActivo(id: number | string) {
   
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (!numericId) {
    
      this.financingForm.patchValue({
        precioVentaActivo: ''
      });
      return;
    }

    const proyecto = this.projects.find(p => p.id === numericId);

    if (proyecto) {
      const precioControl = this.financingForm.get('precioVentaActivo');
      precioControl?.setValue(proyecto.precio);
    } else {
      console.warn('No se encontró el proyecto con ID:', id);
    }
  }

  setupMontoPrestamoCalculation() {
    
    this.financingForm.get('precioVentaActivo')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('cuotaInicial')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('bonoTecho')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('costosNotariales')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('costosRegistrales')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('tasacion')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('comisionEstudio')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
    this.financingForm.get('comisionActivacion')?.valueChanges.subscribe(() => this.calculateMontoPrestamo());
  }

  calculateMontoPrestamo(): number {
    const precioVenta = parseFloat(this.financingForm.get('precioVentaActivo')?.value) || 0;
    const cuotaInicialPct = parseFloat(this.financingForm.get('cuotaInicial')?.value) || 0;
    const bonoTecho = parseFloat(this.financingForm.get('bonoTecho')?.value) || 0;
    const costosNotariales = parseFloat(this.financingForm.get('costosNotariales')?.value) || 0;
    const costosRegistrales = parseFloat(this.financingForm.get('costosRegistrales')?.value) || 0;
    const tasacion = parseFloat(this.financingForm.get('tasacion')?.value) || 0;
    const comisionEstudio = parseFloat(this.financingForm.get('comisionEstudio')?.value) || 0;
    const comisionActivacion = parseFloat(this.financingForm.get('comisionActivacion')?.value) || 0;

    // Fórmula: precioVenta - (precioVenta * cuotaInicial%) - bonoTecho + costos
    const montoPrestamo = precioVenta - (precioVenta * cuotaInicialPct) - bonoTecho +
                          costosNotariales + costosRegistrales + tasacion + 
                          comisionEstudio + comisionActivacion;

    return montoPrestamo;
  }

  onTipoTasaChange() {
    const tipoTasa = this.financingForm.get('tipoTasa')?.value;
    const tasaNominalControl = this.financingForm.get('tasaNominal');
    const tasaEfectivaControl = this.financingForm.get('tasaEfectiva');

    if (tipoTasa === 'NOMINAL') {
      tasaNominalControl?.setValidators([Validators.required, Validators.min(0)]);
      tasaEfectivaControl?.clearValidators();
      tasaEfectivaControl?.setValidators([Validators.min(0)]);
      tasaEfectivaControl?.setValue(0);
    } else {
      tasaEfectivaControl?.setValidators([Validators.required, Validators.min(0)]);
      tasaNominalControl?.clearValidators();
      tasaNominalControl?.setValidators([Validators.min(0)]);
      tasaNominalControl?.setValue(0);
    }

    tasaNominalControl?.updateValueAndValidity();
    tasaEfectivaControl?.updateValueAndValidity();
  }

  onGraciaTipoChange() {
    const graciaTipo = this.financingForm.get('graciaTipo')?.value;
    const graciaMesesControl = this.financingForm.get('graciaMeses');

    if (graciaTipo === 'SIN_GRACIA') {
      graciaMesesControl?.setValue(0);
      graciaMesesControl?.clearValidators();
      graciaMesesControl?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      graciaMesesControl?.setValidators([Validators.required, Validators.min(1)]);
    }

    graciaMesesControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.financingForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.financingForm.getRawValue();
      const montoPrestamo = this.calculateMontoPrestamo();

      const payload = {
        clienteId: parseInt(formValue.clienteId, 10),
        proyectoId: parseInt(formValue.proyectoId, 10),
        bancoId: 1,
        moneda: formValue.moneda,
        tipoTasa: formValue.tipoTasa,
        tasaNominal: parseFloat(formValue.tasaNominal),
        tasaEfectiva: parseFloat(formValue.tasaEfectiva),
        baseTiempo: formValue.baseTiempo,
        capitalizacion: formValue.capitalizacion,
        precioVentaActivo: parseFloat(formValue.precioVentaActivo),
        cuotaInicial: parseFloat(formValue.cuotaInicial),
        bonoTecho: parseFloat(formValue.bonoTecho),
        graciaTipo: formValue.graciaTipo,
        graciaMeses: parseInt(formValue.graciaMeses, 10),
        plazoMeses: parseInt(formValue.plazoMeses, 10),
        montoPrestamo: montoPrestamo,
        costosNotariales: parseFloat(formValue.costosNotariales),
        costosRegistrales: parseFloat(formValue.costosRegistrales),
        tasacion: parseFloat(formValue.tasacion),
        comisionEstudio: parseFloat(formValue.comisionEstudio),
        comisionActivacion: parseFloat(formValue.comisionActivacion),
        comisionPeriodica: parseFloat(formValue.comisionPeriodica),
        portes: parseFloat(formValue.portes),
        gastosAdmPeriodicos: parseFloat(formValue.gastosAdmPeriodicos),
        porcentajeSeguroDesgravamen: parseFloat(formValue.porcentajeSeguroDesgravamen),
        porcentajeSeguroRiesgo: parseFloat(formValue.porcentajeSeguroRiesgo),
        tasaDescuentoAnual: parseFloat(formValue.tasaDescuentoAnual),
        frecuenciaPagoDias: parseInt(formValue.frecuenciaPagoDias, 10),
        diasPorAnio: parseInt(formValue.diasPorAnio, 10),
        estadoCredito: formValue.estadoCredito
      };


      this.financingService.createFinancing(payload).subscribe({
        next: (response) => {
          console.log('✅ Financiamiento creado exitosamente:', response);
          this.successMessage = 'Financiamiento creado exitosamente. Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/dashboard/financing']);
          }, 1500);
        },
        error: (err) => {
          this.isSubmitting = false;

          if (err.status === 0) {
            this.errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo.';
          } else if (err.status === 400) {
            this.errorMessage = `Datos inválidos: ${err.error?.message || 'Verifica todos los campos'}`;
          } else if (err.status === 404) {
            this.errorMessage = 'Recurso no encontado. Verifica que el cliente, proyecto o banco existan.';
          } else if (err.status === 500) {
            this.errorMessage = `Error interno del servidor: ${err.error?.message || 'Verifica los datos ingresados'}`;
          } else {
            this.errorMessage = `Error: ${err.error?.message || 'Error desconocido'}`;
          }
        }
      });
    } else {
      this.financingForm.markAllAsTouched();
      this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente.';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.financingForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.financingForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['min']) return `El valor debe ser mayor o igual a ${field.errors['min'].min}`;
    if (field.errors['max']) return `El valor debe ser menor o igual a ${field.errors['max'].max}`;
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;

    return 'Campo inválido';
  }

  goBack() {
    this.router.navigate(['/dashboard/financing']);
  }
}