import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        <app-ui-button 
          label="Nuevo proyecto" 
          icon="+" 
          (onClick)="navigateToCreate()">
        </app-ui-button>
      </div>

      <div class="colmena-table-container">
        <table class="colmena-table">
          <thead>
            <tr>
              <th>ProyectID</th>
              <th>Tipo</th>
              <th>Direccion</th>
              <th>Area del proyecto</th>
              <th>Igv</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let project of projects">
              <td>{{ project.id }}</td>
              <td>{{ project.tipoProyecto }}</td>
              <td>{{ project.direccion }}</td>
              <td>{{ project.areaM2 }}</td>
              <td>{{ project.igv | currency:'USD':'symbol':'1.2-2' }}</td>
              <td>{{ project.precio | currency:'USD':'symbol':'1.2-2' }}</td>
              <td>
                <app-ui-button 
                  label="Ver proyecto" 
                  (onClick)="viewProject(project)">
                </app-ui-button>
              </td>
            </tr>
            <tr *ngIf="projects.length === 0">
              <td colspan="7" style="text-align: center;">No hay proyectos registrados.</td>
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
  `]
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    constructor(
        private projectService: ProjectService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects() {
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.projects = data;
            },
            error: (err) => {
                console.error('Error loading projects', err);
            }
        });
    }

    navigateToCreate() {
        this.router.navigate(['/dashboard/create-project']);
    }

    viewProject(project: Project) {
        console.log('View project', project);
        this.router.navigate(['/dashboard/projects', project.id]);
    }
}
