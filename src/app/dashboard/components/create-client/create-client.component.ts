import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../infrastructure/services/client.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiInputComponent],
  template: `
    <div class="create-client-container">
      <div class="back-link" (click)="goBack()">
        <span class="material-icons">arrow_back</span> Volver a lista de clientes
      </div>

      <div class="form-card bg-primary-yellow">
        <h2 class="form-title">Crear nuevo cliente</h2>
        
        <div *ngIf="errorMessage" class="error-alert">
            {{ errorMessage }}
        </div>

        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="ID del cliente" 
                placeholder="Ingresar ID del cliente (DNI/CDE/PAS)" 
                icon="person_outline"
                formControlName="dni"
                [errorMessage]="isFieldInvalid('dni') ? getErrorMessage('dni') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Nombres" 
                placeholder="Ingresar el nombre del cliente" 
                icon="person_outline"
                formControlName="nombres"
                [errorMessage]="isFieldInvalid('nombres') ? getErrorMessage('nombres') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Apellidos" 
                placeholder="Ingresar el apellido del cliente" 
                icon="person_outline"
                formControlName="apellidos"
                [errorMessage]="isFieldInvalid('apellidos') ? getErrorMessage('apellidos') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Email" 
                placeholder="Ingresar el email del cliente" 
                icon="email"
                formControlName="email"
                [errorMessage]="isFieldInvalid('email') ? getErrorMessage('email') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Dependientes" 
                placeholder="Ingresar los dependientes" 
                icon="people_outline"
                type="number"
                formControlName="dependientes"
                [errorMessage]="isFieldInvalid('dependientes') ? getErrorMessage('dependientes') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Gasto mensual" 
                placeholder="Ingresar el gasto mensual" 
                icon="attach_money"
                type="number"
                formControlName="gastoMensualAprox"
                [errorMessage]="isFieldInvalid('gastoMensualAprox') ? getErrorMessage('gastoMensualAprox') : ''">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="Número de contacto" 
                placeholder="Ingresar el teléfono del cliente" 
                icon="phone"
                formControlName="telefono"
                [errorMessage]="isFieldInvalid('telefono') ? getErrorMessage('telefono') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Ingresos" 
                placeholder="Ingresar el ingreso del cliente" 
                icon="attach_money"
                type="number"
                formControlName="ingresoMensual"
                [errorMessage]="isFieldInvalid('ingresoMensual') ? getErrorMessage('ingresoMensual') : ''">
              </app-ui-input>

              <div class="input-container">
                <label class="input-label">Situación laboral</label>
                <div class="select-wrapper">
                    <span class="input-icon material-icons">work_outline</span>
                    <select formControlName="situacionLaboral" class="ui-input">
                        <option value="" disabled selected>Seleccionar la situación del cliente</option>
                        <option value="DEPENDIENTE">Dependiente</option>
                        <option value="INDEPENDIENTE">Independiente</option>
                    </select>
                </div>
                <span class="error-text" *ngIf="isFieldInvalid('situacionLaboral')">{{ getErrorMessage('situacionLaboral') }}</span>
              </div>

              <app-ui-input 
                label="Puntaje de riesgo financiero" 
                placeholder="Ingresar el puntaje de riesgo" 
                icon="trending_up"
                type="number"
                formControlName="scoreRiesgo"
                [errorMessage]="isFieldInvalid('scoreRiesgo') ? getErrorMessage('scoreRiesgo') : ''">
              </app-ui-input>

              <div class="input-container">
                <label class="input-label">Estado civil</label>
                <div class="select-wrapper">
                    <span class="input-icon material-icons">favorite_border</span>
                    <select formControlName="estadoCivil" class="ui-input">
                        <option value="" disabled selected>Selecciona el estado civil</option>
                        <option value="SOLTERO">Soltero</option>
                        <option value="CASADO">Casado</option>
                    </select>
                </div>
                <span class="error-text" *ngIf="isFieldInvalid('estadoCivil')">{{ getErrorMessage('estadoCivil') }}</span>
              </div>

              <div class="button-container">
                 <app-ui-button 
                    label="Crear" 
                    type="submit"
                    [fullWidth]="false"
                    class="create-btn"
                    [disabled]="clientForm.invalid">
                 </app-ui-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-client-container {
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
    /* Styles for Select (duplicating input styles for now, should be shared) */
    .input-container {
      margin-bottom: 15px;
    }
    .input-label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: var(--primary-blue);
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
    }
    .ui-input {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 1px solid var(--primary-blue);
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.1); /* Slight transparency or just border */
      border: 1px solid #333; /* Darker border */
      color: var(--text-dark);
      font-size: 1rem;
      outline: none;
      appearance: none; /* Remove default arrow */
    }
    
    /* Button positioning */
    .button-container {
        margin-top: auto;
        display: flex;
        justify-content: flex-end;
    }
    
    /* Override button style for this form to be dark blue */
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
    .error-text {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
        padding-left: 10px;
    }
  `]
})
export class CreateClientComponent {
  clientForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[0-9A-Za-z]+$')]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dependientes: [0, [Validators.min(0)]],
      gastoMensualAprox: [0, [Validators.min(0)]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern('^[0-9+]+$')]],
      ingresoMensual: [0, [Validators.required, Validators.min(0)]],
      situacionLaboral: ['', Validators.required],
      scoreRiesgo: [0, [Validators.min(0)]],
      estadoCivil: ['', Validators.required],
      usuarioId: [1] // Hardcoded for now
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.errorMessage = '';
      this.clientService.createClient(this.clientForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/clients']);
        },
        error: (err) => {
          console.error('Error creating client', err);
          if (err.status === 500) {
            this.errorMessage = 'Error interno del servidor. Es posible que el cliente ya exista (DNI duplicado).';
          } else if (err.status === 404) {
            this.errorMessage = 'No se pudo conectar con el servidor (404). Verifica que el backend esté corriendo.';
          } else {
            this.errorMessage = 'Ocurrió un error al crear el cliente. Por favor intenta nuevamente.';
          }
        }
      });
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.clientForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.clientForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['email']) return 'Formato de email inválido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `El valor debe ser mayor o igual a ${field.errors['min'].min}`;
    if (field.errors['pattern']) return 'Formato inválido (solo números o letras permitidas)';

    return 'Campo inválido';
  }

  goBack() {
    this.router.navigate(['/dashboard/clients']);
  }
}
