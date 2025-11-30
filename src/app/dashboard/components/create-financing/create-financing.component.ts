import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancingService } from '../../infrastructure/services/financing.service';
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

        <form [formGroup]="financingForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="Monto del préstamo" 
                placeholder="Ingresar monto" 
                icon="attach_money"
                type="number"
                formControlName="montoPrestamo"
                [errorMessage]="isFieldInvalid('montoPrestamo') ? getErrorMessage('montoPrestamo') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Tasa de interés anual (%)" 
                placeholder="Ingresar tasa" 
                icon="percent"
                type="number"
                formControlName="tasaInteresAnual"
                [errorMessage]="isFieldInvalid('tasaInteresAnual') ? getErrorMessage('tasaInteresAnual') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Plazo (meses)" 
                placeholder="Ingresar plazo" 
                icon="calendar_today"
                type="number"
                formControlName="plazoMeses"
                [errorMessage]="isFieldInvalid('plazoMeses') ? getErrorMessage('plazoMeses') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Fecha de inicio" 
                placeholder="YYYY-MM-DD" 
                icon="event"
                type="date"
                formControlName="fechaInicio"
                [errorMessage]="isFieldInvalid('fechaInicio') ? getErrorMessage('fechaInicio') : ''">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="ID Cliente" 
                placeholder="ID del cliente" 
                icon="person"
                type="number"
                formControlName="clienteId"
                [errorMessage]="isFieldInvalid('clienteId') ? getErrorMessage('clienteId') : ''">
              </app-ui-input>

              <app-ui-input 
                label="ID Proyecto" 
                placeholder="ID del proyecto" 
                icon="home"
                type="number"
                formControlName="proyectoId"
                [errorMessage]="isFieldInvalid('proyectoId') ? getErrorMessage('proyectoId') : ''">
              </app-ui-input>

              <app-ui-input 
                label="ID Banco" 
                placeholder="ID del banco" 
                icon="account_balance"
                type="number"
                formControlName="bancoId"
                [errorMessage]="isFieldInvalid('bancoId') ? getErrorMessage('bancoId') : ''">
              </app-ui-input>

              <div class="button-container">
                 <app-ui-button 
                    label="Crear" 
                    type="submit"
                    [fullWidth]="false"
                    class="create-btn"
                    [disabled]="financingForm.invalid">
                 </app-ui-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-financing-container {
      padding: 20px;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      font-weight: 600;
      color: var(--primary-blue);
    }
    .form-card {
      padding: 30px;
      border-radius: 15px;
    }
    .form-title {
      color: var(--primary-blue);
      margin-bottom: 25px;
      font-size: 1.5rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .form-column {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .button-container {
        margin-top: auto;
        display: flex;
        justify-content: flex-end;
    }
    ::ng-deep .create-btn .ui-button {
        background-color: var(--primary-blue) !important;
        color: white !important;
        padding-left: 40px;
        padding-right: 40px;
    }
    .error-alert {
        background-color: #f8d7da;
        color: #721c24;
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
    }
  `]
})
export class CreateFinancingComponent {
  financingForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private financingService: FinancingService,
    private router: Router
  ) {
    this.financingForm = this.fb.group({
      montoPrestamo: [0, [Validators.required, Validators.min(1)]],
      tasaInteresAnual: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      plazoMeses: [0, [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      clienteId: [1, Validators.required],
      proyectoId: [1, Validators.required],
      bancoId: [1, Validators.required],
      seguroDesgravamenMensual: [0],
      seguroInmuebleAnual: [0],
      estadoCredito: ['APROBADO']
    });
  }

  onSubmit() {
    if (this.financingForm.valid) {
      this.errorMessage = '';
      this.financingService.createFinancing(this.financingForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/financing']);
        },
        error: (err) => {
          console.error('Error creating financing', err);
          if (err.status === 500) {
            this.errorMessage = 'Error interno del servidor. Verifica los datos.';
          } else if (err.status === 404) {
            this.errorMessage = 'No se pudo conectar con el servidor (404).';
          } else {
            this.errorMessage = 'Ocurrió un error al crear el financiamiento.';
          }
        }
      });
    } else {
      this.financingForm.markAllAsTouched();
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

    return 'Campo inválido';
  }

  goBack() {
    this.router.navigate(['/dashboard/financing']);
  }
}
