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
        
        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="Nombre del proyecto" 
                placeholder="Ingresar nombre del proyecto" 
                icon="home"
                formControlName="nombre">
              </app-ui-input>

              <app-ui-input 
                label="Dirección" 
                placeholder="Ingresar la dirección del proyecto" 
                icon="home"
                formControlName="direccion">
              </app-ui-input>

              <app-ui-input 
                label="Distrito" 
                placeholder="Ingresar el distrito del proyecto" 
                icon="home"
                formControlName="distrito">
              </app-ui-input>

              <app-ui-input 
                label="Área del proyecto" 
                placeholder="Ingresar el área del proyecto" 
                icon="home"
                type="number"
                formControlName="areaM2">
              </app-ui-input>

              <app-ui-input 
                label="ID del banco (BCP)" 
                placeholder="Ingresar el ID del banco" 
                icon="home"
                type="number"
                formControlName="bancoId">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="Precio" 
                placeholder="Ingresar el precio de la propiedad" 
                icon="home"
                type="number"
                formControlName="precio">
              </app-ui-input>

              <app-ui-input 
                label="Número de habitaciones" 
                placeholder="Ingresar el N de habitaciones" 
                icon="home"
                type="number"
                formControlName="numHabitaciones">
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
              </div>

              <div class="input-container">
                <label class="input-label">Estado del proyecto</label>
                <div class="select-wrapper">
                    <span class="input-icon material-icons">home</span>
                    <select formControlName="estadoProyecto" class="ui-input">
                        <option value="" disabled selected>Estado del proyecto</option>
                        <option value="EN_PLANOS">En Planos</option>
                        <option value="EN_CONSTRUCCION">En Construcción</option>
                        <option value="ENTREGA_INMEDIATA">Entrega Inmediata</option>
                    </select>
                </div>
              </div>

              <div class="button-container">
                 <app-ui-button 
                    label="Crear" 
                    type="submit"
                    [fullWidth]="false"
                    class="create-btn">
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
  `]
})
export class CreateProjectComponent {
    projectForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private router: Router
    ) {
        this.projectForm = this.fb.group({
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            distrito: ['', Validators.required],
            areaM2: [0, Validators.required],
            precio: [0, Validators.required],
            igv: [0], // Calculated or input? Assuming input or backend calc
            numHabitaciones: [0, Validators.required],
            tipoProyecto: ['', Validators.required],
            estadoProyecto: ['', Validators.required],
            bancoId: [1, Validators.required] // Default or input
        });
    }

    onSubmit() {
        if (this.projectForm.valid) {
            // Simple IGV calc if needed, or let backend handle it
            const formValue = this.projectForm.value;
            formValue.igv = formValue.precio * 0.18; // Example

            this.projectService.createProject(formValue).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard/projects']);
                },
                error: (err) => {
                    console.error('Error creating project', err);
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/dashboard/projects']);
    }
}
