import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../infrastructure/services/project.service';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiInputComponent],
  template: `
    <div class="create-project-container">
      <div class="back-link" (click)="goBack()">
        <span class="material-icons">arrow_back</span> Volver a lista de proyectos
      </div>

      <div class="form-card bg-primary-yellow">
        <h2 class="form-title">Crear nuevo proyecto</h2>
        
        <div *ngIf="errorMessage" class="error-alert">
            {{ errorMessage }}
        </div>

        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="Nombre del proyecto" 
                placeholder="Ingresar nombre del proyecto" 
                icon="home"
                formControlName="nombre"
                [errorMessage]="isFieldInvalid('nombre') ? getErrorMessage('nombre') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Dirección" 
                placeholder="Ingresar la dirección del proyecto" 
                icon="home"
                formControlName="direccion"
                [errorMessage]="isFieldInvalid('direccion') ? getErrorMessage('direccion') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Distrito" 
                placeholder="Ingresar el distrito del proyecto" 
                icon="home"
                formControlName="distrito"
                [errorMessage]="isFieldInvalid('distrito') ? getErrorMessage('distrito') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Área del proyecto" 
                placeholder="Ingresar el área del proyecto" 
                icon="home"
                type="number"
                formControlName="areaM2"
                [errorMessage]="isFieldInvalid('areaM2') ? getErrorMessage('areaM2') : ''">
              </app-ui-input>

              <app-ui-input 
                label="ID del banco (BCP)" 
                placeholder="Ingresar el ID del banco" 
                icon="home"
                type="number"
                formControlName="bancoId"
                [errorMessage]="isFieldInvalid('bancoId') ? getErrorMessage('bancoId') : ''">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="Precio" 
                placeholder="Ingresar el precio de la propiedad" 
                icon="home"
                type="number"
                formControlName="precio"
                [errorMessage]="isFieldInvalid('precio') ? getErrorMessage('precio') : ''">
              </app-ui-input>

              <app-ui-input 
                label="Número de habitaciones" 
                placeholder="Ingresar el N de habitaciones" 
                icon="home"
                type="number"
                formControlName="numHabitaciones"
                [errorMessage]="isFieldInvalid('numHabitaciones') ? getErrorMessage('numHabitaciones') : ''">
              </app-ui-input>

              <div class="input-container">
                <label class="input-label">Tipo de proyecto</label>
                <div class="select-wrapper">
                    <span class="input-icon material-icons">home</span>
                    <select formControlName="tipoProyecto" class="ui-input">
                        <option value="" disabled selected>Tipo de proyecto</option>
                        <option value="DEPARTAMENTO">Departamento</option>
                        <option value="CASA">Casa</option>
                    </select>
                </div>
                <span class="error-text" *ngIf="isFieldInvalid('tipoProyecto')">{{ getErrorMessage('tipoProyecto') }}</span>
              </div>

              <div class="input-container">
                <label class="input-label">Estado del proyecto</label>
                <div class="select-wrapper">
                    <span class="input-icon material-icons">home</span>
                    <select formControlName="estadoProyecto" class="ui-input">
                        <option value="" disabled selected>Estado del proyecto</option>
                        <option value="DISPONIBLE">Disponible</option>
                        <option value="EN_CONSTRUCCION">En Construcción</option>
                        <option value="RESERVADO">Reservado</option>
                        <option value="VENDIDO">Vendido</option>
                    </select>
                </div>
                <span class="error-text" *ngIf="isFieldInvalid('estadoProyecto')">{{ getErrorMessage('estadoProyecto') }}</span>
              </div>

              <div class="button-container">
                 <app-ui-button 
                    label="Crear" 
                    type="submit"
                    [fullWidth]="false"
                    class="create-btn"
                    [disabled]="projectForm.invalid">
                 </app-ui-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-project-container {
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
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid #333;
      color: var(--text-dark);
      font-size: 1rem;
      outline: none;
      appearance: none;
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
    .error-text {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
        padding-left: 10px;
    }
  `]
})
export class CreateProjectComponent {
  projectForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      distrito: ['', Validators.required],
      areaM2: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      igv: [0],
      numHabitaciones: [0, [Validators.required, Validators.min(1)]],
      tipoProyecto: ['', Validators.required],
      estadoProyecto: ['', Validators.required],
      bancoId: [1, Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.errorMessage = '';
      const formValue = this.projectForm.value;
      
      // Convert data types to match backend expectations
      const projectData = {
        nombre: formValue.nombre,
        direccion: formValue.direccion,
        distrito: formValue.distrito,
        areaM2: parseFloat(formValue.areaM2),
        precio: parseFloat(formValue.precio),
        igv: parseFloat(formValue.precio) * 0.18,
        numHabitaciones: parseInt(formValue.numHabitaciones),
        tipoProyecto: formValue.tipoProyecto,
        estadoProyecto: formValue.estadoProyecto,
        bancoId: parseInt(formValue.bancoId)
      };

      console.log('Sending project data:', projectData);

      this.projectService.createProject(projectData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projects']);
        },
        error: (err) => {
          console.error('Error creating project', err);
          if (err.status === 500) {
            this.errorMessage = 'Error interno del servidor. Verifica los datos ingresados.';
          } else if (err.status === 404) {
            this.errorMessage = 'No se pudo conectar con el servidor (404).';
          } else {
            this.errorMessage = 'Ocurrió un error al crear el proyecto.';
          }
        }
      });
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.projectForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `El valor debe ser mayor o igual a ${field.errors['min'].min}`;

    return 'Campo inválido';
  }

  goBack() {
    this.router.navigate(['/dashboard/projects']);
  }
}
