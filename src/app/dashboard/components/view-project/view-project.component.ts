import { Component, OnInit } from '@angular/core';
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
      <div class="page-header">
        <h1 class="page-title">Ver Proyecto</h1>
        <app-ui-button 
          label="Volver" 
          icon="←" 
          (onClick)="goBack()">
        </app-ui-button>
      </div>

      <div class="project-details" *ngIf="project; else loading">
        <div class="project-card">
          <div class="project-header">
            <h2>{{ project.nombre }}</h2>
            <span class="project-id">ID: {{ project.id }}</span>
          </div>

          <div class="project-info-grid">
            <div class="info-group">
              <h3>Información General</h3>
              <div class="info-item">
                <span class="label">Nombre del Proyecto:</span>
                <span class="value">{{ project.nombre }}</span>
              </div>
              <div class="info-item">
                <span class="label">Tipo de Proyecto:</span>
                <span class="value">{{ project.tipoProyecto }}</span>
              </div>
              <div class="info-item">
                <span class="label">Estado del Proyecto:</span>
                <span class="value project-status" [class.completed]="project.estadoProyecto === 'Completado'"
                      [class.in-progress]="project.estadoProyecto === 'En Progreso'"
                      [class.pending]="project.estadoProyecto === 'Pendiente'">
                  {{ project.estadoProyecto }}
                </span>
              </div>
            </div>

            <div class="info-group">
              <h3>Ubicación</h3>
              <div class="info-item">
                <span class="label">Dirección:</span>
                <span class="value">{{ project.direccion }}</span>
              </div>
              <div class="info-item">
                <span class="label">Distrito:</span>
                <span class="value">{{ project.distrito }}</span>
              </div>
            </div>

            <div class="info-group">
              <h3>Características</h3>
              <div class="info-item">
                <span class="label">Área del Proyecto:</span>
                <span class="value">{{ project.areaM2 }} m²</span>
              </div>
              <div class="info-item">
                <span class="label">Número de Habitaciones:</span>
                <span class="value">{{ project.numHabitaciones }}</span>
              </div>
            </div>

            <div class="info-group">
              <h3>Información Financiera</h3>
              <div class="info-item">
                <span class="label">Precio:</span>
                <span class="value price">{{ project.precio | currency:'USD':'symbol':'1.2-2' }}</span>
              </div>
              <div class="info-item">
                <span class="label">IGV:</span>
                <span class="value">{{ project.igv | currency:'USD':'symbol':'1.2-2' }}</span>
              </div>
              <div class="info-item">
                <span class="label">ID del Banco:</span>
                <span class="value">{{ project.bancoId }}</span>
              </div>
            </div>
          </div>

          <div class="actions">
            <app-ui-button 
              label="Editar Proyecto" 
              icon="✏️" 
              (onClick)="editProject()">
            </app-ui-button>
            <app-ui-button 
              label="Ver Financiamiento" 
              icon="💰" 
              (onClick)="viewFinancing()">
            </app-ui-button>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <div class="loading">
          <p>Cargando información del proyecto...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .view-project-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .page-title {
      margin: 0;
      color: #333;
      font-size: 2rem;
    }

    .project-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 30px;
      border: 1px solid #e5e7eb;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f3f4f6;
    }

    .project-header h2 {
      margin: 0;
      color: #1f2937;
      font-size: 1.5rem;
    }

    .project-id {
      background: #f3f4f6;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .project-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-bottom: 30px;
    }

    .info-group h3 {
      margin: 0 0 15px 0;
      color: #374151;
      font-size: 1.1rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f9fafb;
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .value {
      font-weight: 400;
      color: #1f2937;
      text-align: right;
    }

    .price {
      font-weight: 600;
      color: #059669;
      font-size: 1.1rem;
    }

    .project-status {
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .completed {
      background-color: #d1fae5;
      color: #065f46;
    }

    .in-progress {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .pending {
      background-color: #fed7aa;
      color: #92400e;
    }

    .actions {
      display: flex;
      gap: 15px;
      justify-content: flex-start;
      padding-top: 20px;
      border-top: 2px solid #f3f4f6;
    }

    .loading {
      text-align: center;
      padding: 50px;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .project-info-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
  `]
})
export class ViewProjectComponent implements OnInit {
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(+projectId);
    } else {
      this.goBack();
    }
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
      },
      error: (err) => {
        console.error('Error loading project', err);
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/projects']);
  }

  editProject(): void {
    if (this.project) {
      this.router.navigate(['/dashboard/create-project'], { 
        queryParams: { editId: this.project.id } 
      });
    }
  }

  viewFinancing(): void {
    if (this.project) {
      // TODO: Navigate to financing view when implemented
      console.log('View financing for project:', this.project.id);
    }
  }
}
