import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../infrastructure/services/project.service';
import { Project } from '../../domain/model/project.model';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  template: `
    <div class="view-project-container">
      <div class="back-link" (click)="goBack()">
        <span class="material-icons">arrow_back</span> Volver a lista de proyectos
      </div>

      <div class="form-card bg-primary-yellow" *ngIf="project">
        <h2 class="form-title">Proyecto: {{ project.nombre }}</h2>
        
        <div class="form-grid">
          <!-- Left Column -->
          <div class="form-column">
            <div class="input-container">
              <label class="input-label">ID del proyecto</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">tag</span>
                <input 
                  type="text" 
                  [value]="project.id?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Nombre del proyecto</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">home</span>
                <input 
                  type="text" 
                  [value]="project.nombre || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Dirección</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">place</span>
                <input 
                  type="text" 
                  [value]="project.direccion || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Distrito</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">location_city</span>
                <input 
                  type="text" 
                  [value]="project.distrito || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Área del proyecto (m²)</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">straighten</span>
                <input 
                  type="text" 
                  [value]="project.areaM2 + ' m²' || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">ID del banco</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">account_balance</span>
                <input 
                  type="text" 
                  [value]="project.bancoId?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="form-column">
            <div class="input-container">
              <label class="input-label">Precio</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">attach_money</span>
                <input 
                  type="text" 
                  [value]="(project.precio | currency:'USD':'symbol':'1.0-0') || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">IGV</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">receipt</span>
                <input 
                  type="text" 
                  [value]="((project.igv * 100) | number:'1.0-0') + '%' || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Número de habitaciones</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">bed</span>
                <input 
                  type="text" 
                  [value]="project.numHabitaciones?.toString() || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Tipo de proyecto</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">apartment</span>
                <input 
                  type="text" 
                  [value]="project.tipoProyecto || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>

            <div class="input-container">
              <label class="input-label">Estado del proyecto</label>
              <div class="input-wrapper">
                <span class="input-icon material-icons">flag</span>
                <input 
                  type="text" 
                  [value]="project.estadoProyecto || ''"
                  readonly 
                  class="ui-input readonly" />
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Loading state -->
      <div class="form-card bg-primary-yellow" *ngIf="isLoading">
        <div class="loading-message">
          <div class="spinner"></div>
          <p>Cargando información del proyecto...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .view-project-container {
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
    .loading-message {
      text-align: center;
      padding: 40px;
      color: var(--primary-blue);
      font-size: 1.1rem;
    }
    .spinner {
      margin: 0 auto 20px;
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--primary-blue);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `]
})
export class ViewProjectComponent implements OnInit {
  project: Project | null = null;
  projectId: number | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Project ID from route:', id);
    
    if (id) {
      this.projectId = +id;
      console.log('ProjectId set to:', this.projectId);
      this.loadProject(this.projectId);
    } else {
      console.log('No project ID provided, going back');
      this.goBack();
    }
  }

  loadProject(id: number): void {
    console.log('Loading project with ID:', id);
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        console.log('Project data received:', data);
        this.project = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading project', err);
        this.isLoading = false;
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/projects']);
  }
  
}