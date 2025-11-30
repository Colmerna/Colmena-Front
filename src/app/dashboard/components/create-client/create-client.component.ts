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
        
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="ID del cliente" 
                placeholder="Ingresar ID del cliente (DNI/CDE/PAS)" 
                icon="person_outline"
                formControlName="dni">
              </app-ui-input>

              <app-ui-input 
                label="Nombres" 
                placeholder="Ingresar el nombre del cliente" 
                icon="person_outline"
                formControlName="nombres">
              </app-ui-input>

              <app-ui-input 
                label="Apellidos" 
                placeholder="Ingresar el apellido del cliente" 
                icon="person_outline"
                formControlName="apellidos">
              </app-ui-input>

              <app-ui-input 
                label="Email" 
                placeholder="Ingresar el email del cliente" 
                icon="email"
                formControlName="email">
              </app-ui-input>

              <app-ui-input 
                label="Dependientes" 
                placeholder="Ingresar los dependientes" 
                icon="people_outline"
                type="number"
                formControlName="dependientes">
              </app-ui-input>

              <app-ui-input 
                label="Gasto mensual" 
                placeholder="Ingresar el gasto mensual" 
                icon="attach_money"
                type="number"
                formControlName="gastoMensualAprox">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="Número de contacto" 
                placeholder="Ingresar el teléfono del cliente" 
                icon="phone"
                formControlName="telefono">
              </app-ui-input>

              <app-ui-input 
                label="Ingresos" 
                placeholder="Ingresar el ingreso del cliente" 
                icon="attach_money"
                type="number"
                formControlName="ingresoMensual">
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
              </div>

              <app-ui-input 
                label="Puntaje de riesgo financiero" 
                placeholder="Ingresar el puntaje de riesgo" 
                icon="trending_up"
                type="number"
                formControlName="scoreRiesgo">
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
      background-color: var(--primary-yellow); /* Or transparent if parent is yellow? No, input bg is yellow/transparent */
      /* Actually in the image the inputs are slightly darker yellow or outlined? 
         The inputs seem to have a border and same background color as card but maybe slightly different shade?
         Let's stick to the shared input style which has yellow background.
         Wait, if the card is yellow, and input is yellow, it might blend. 
         In the image, the inputs have a border.
      */
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
  `]
})
export class CreateClientComponent {
    clientForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private clientService: ClientService,
        private router: Router
    ) {
        this.clientForm = this.fb.group({
            dni: ['', Validators.required],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            dependientes: [0],
            gastoMensualAprox: [0],
            telefono: ['', Validators.required],
            ingresoMensual: [0, Validators.required],
            situacionLaboral: ['', Validators.required],
            scoreRiesgo: [0],
            estadoCivil: ['', Validators.required],
            usuarioId: [1] // Hardcoded for now
        });
    }

    onSubmit() {
        if (this.clientForm.valid) {
            this.clientService.createClient(this.clientForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard/clients']);
                },
                error: (err) => {
                    console.error('Error creating client', err);
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/dashboard/clients']);
    }
}
