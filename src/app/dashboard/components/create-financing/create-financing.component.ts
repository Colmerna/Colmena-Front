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
        
        <form [formGroup]="financingForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <app-ui-input 
                label="Monto del préstamo" 
                placeholder="Ingresar monto" 
                icon="attach_money"
                type="number"
                formControlName="montoPrestamo">
              </app-ui-input>

              <app-ui-input 
                label="Tasa de interés anual (%)" 
                placeholder="Ingresar tasa" 
                icon="percent"
                type="number"
                formControlName="tasaInteresAnual">
              </app-ui-input>

              <app-ui-input 
                label="Plazo (meses)" 
                placeholder="Ingresar plazo" 
                icon="calendar_today"
                type="number"
                formControlName="plazoMeses">
              </app-ui-input>

              <app-ui-input 
                label="Fecha de inicio" 
                placeholder="YYYY-MM-DD" 
                icon="event"
                type="date"
                formControlName="fechaInicio">
              </app-ui-input>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <app-ui-input 
                label="ID Cliente" 
                placeholder="ID del cliente" 
                icon="person"
                type="number"
                formControlName="clienteId">
              </app-ui-input>

              <app-ui-input 
                label="ID Proyecto" 
                placeholder="ID del proyecto" 
                icon="home"
                type="number"
                formControlName="proyectoId">
              </app-ui-input>

              <app-ui-input 
                label="ID Banco" 
                placeholder="ID del banco" 
                icon="account_balance"
                type="number"
                formControlName="bancoId">
              </app-ui-input>

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
  `]
})
export class CreateFinancingComponent {
    financingForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private financingService: FinancingService,
        private router: Router
    ) {
        this.financingForm = this.fb.group({
            montoPrestamo: [0, Validators.required],
            tasaInteresAnual: [0, Validators.required],
            plazoMeses: [0, Validators.required],
            fechaInicio: ['', Validators.required],
            clienteId: [1, Validators.required], // Default or input
            proyectoId: [1, Validators.required], // Default or input
            bancoId: [1, Validators.required], // Default or input
            seguroDesgravamenMensual: [0],
            seguroInmuebleAnual: [0],
            estadoCredito: ['APROBADO'] // Default
        });
    }

    onSubmit() {
        if (this.financingForm.valid) {
            this.financingService.createFinancing(this.financingForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard/financing']);
                },
                error: (err) => {
                    console.error('Error creating financing', err);
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/dashboard/financing']);
    }
}
