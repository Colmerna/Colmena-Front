import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../infrastructure/services/client.service';
import { Client } from '../../domain/model/client.model';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { FinancingService } from '../../infrastructure/services/financing.service';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  template: `
    <div class="view-client-container">
      <div class="back-link" (click)="goBack()">
        <span class="material-icons">arrow_back</span> Volver a lista de clientes
      </div>

      <div class="form-card bg-primary-yellow">
        <h2 class="form-title">Cliente: {{ client?.nombres }} {{ client?.apellidos }}</h2>
        
        <div class="form-grid">
          <!-- Left Column -->
          <div class="form-column">
            <div class="input-container">
              <label class="input-label">ID del cliente</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">person_outline</span>
                <input 
                  type="text" 
                  [value]="client?.id?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Nombres</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">person_outline</span>
                <input 
                  type="text" 
                  [value]="client?.nombres || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Apellidos</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">person_outline</span>
                <input 
                  type="text" 
                  [value]="client?.apellidos || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Email</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">email</span>
                <input 
                  type="email" 
                  [value]="client?.email || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Dependientes</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">people_outline</span>
                <input 
                  type="number" 
                  [value]="client?.dependientes?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Gasto mensual</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">attach_money</span>
                <input 
                  type="text" 
                  [value]="client?.gastoMensualAprox?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="form-column">
            <div class="input-container">
              <label class="input-label">Número de contacto</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">phone</span>
                <input 
                  type="tel" 
                  [value]="client?.telefono || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Ingresos</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">attach_money</span>
                <input 
                  type="text" 
                  [value]="client?.ingresoMensual?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Situación laboral</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">work</span>
                <input 
                  type="text" 
                  [value]="client?.situacionLaboral || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Estado civil</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">favorite</span>
                <input 
                  type="text" 
                  [value]="client?.estadoCivil || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Puntaje de riesgo financiero</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">trending_up</span>
                <input 
                  type="text" 
                  [value]="client?.scoreRiesgo?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .view-client-container {
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
        margin-top: 30px;
        display: flex;
        justify-content: flex-start;
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
    .input-wrapper {
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
    }
    .ui-input.readonly {
      background-color: rgba(255, 255, 255, 0.3);
      cursor: not-allowed;
    }
    .ui-input.readonly:focus {
      border-width: 1px;
    }
  `]
})
export class ViewClientComponent implements OnInit {
  client: Client | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private cdr: ChangeDetectorRef,
    private financingService: FinancingService
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    console.log('Client ID from route:', clientId);
    if (clientId) {
      this.loadClient(+clientId);
    } else {
      console.log('No client ID provided, going back');
      this.goBack();
    }
  }

  loadClient(id: number): void {
    console.log('Loading client with ID:', id);
    this.clientService.getClientById(id).subscribe({
      next: (data) => {
        console.log('Client data received:', data);
        this.client = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error loading client', err);
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/clients']);
  }


}
