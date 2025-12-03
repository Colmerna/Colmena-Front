import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../infrastructure/services/project.service';
import { Project } from '../../domain/model/project.model';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
    selector: 'app-project-list',
    standalone: true,
    imports: [CommonModule, UiButtonComponent],
    template: `
    <div class="project-list-container">
      <div class="page-header">
        <h1 class="page-title">Lista de Proyectos registrados</h1>
        <!-- Debug info -->
        <div *ngIf="projects.length > 0" style="font-size: 10px; color: #666;">
            Proyectos cargados: {{ projects.length }}
        </div>
        <app-ui-button 
          label="Nuevo proyecto" 
          icon="+" 
          (onClick)="navigateToCreate()">
        </app-ui-button>
        <app-ui-button 
          label="Refrescar" 
          icon="refresh" 
          (onClick)="refresh()"
          style="margin-left: 10px;">
        </app-ui-button>
      </div>

      <div class="colmena-table-container">
        <table class="colmena-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Distrito</th>
              <th>Área (m²)</th>
              <th>Habitaciones</th>
              <th>IGV</th>
              <th>Precio</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let project of projects">
              <td>{{ project.id }}</td>
              <td>{{ project.nombre }}</td>
              <td>{{ project.tipoProyecto }}</td>
              <td>{{ project.direccion }}</td>
              <td>{{ project.distrito }}</td>
              <td>{{ project.areaM2 }} m²</td>
              <td>{{ project.numHabitaciones }}</td>
              <td>{{ (project.igv * 100) | number:'1.0-0' }}%</td>
              <td>{{ project.precio | currency:'USD':'symbol':'1.0-0' }}</td>
              <td>{{ project.estadoProyecto }}</td>
              <td>
                <app-ui-button 
                  label="Ver proyecto" 
                  (onClick)="viewProject(project)">
                </app-ui-button>
              </td>
            </tr>
            <tr *ngIf="projects.length === 0">
              <td colspan="11" style="text-align: center;">No hay proyectos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .project-list-container {
      padding: 20px;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 10px;
    }

    .page-title {
      margin: 0;
      flex: 1;
    }
  `]
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    constructor(
        private projectService: ProjectService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects() {
        console.log('Loading projects...');
        this.projectService.getProjects().subscribe({
            next: (data) => {
                console.log('Projects loaded:', data);
                console.log('Number of projects:', data.length);
                this.projects = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading projects:', err);
            }
        });
    }

    navigateToCreate() {
        this.router.navigate(['/dashboard/create-project']);
    }

    refresh() {
        this.projects = [];
        this.cdr.detectChanges();
        this.loadProjects();
    }

    viewProject(project: Project) {
        console.log('View project', project);
        this.router.navigate(['/dashboard/projects', project.id]);
    }
}