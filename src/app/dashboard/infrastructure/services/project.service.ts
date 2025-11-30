import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../domain/model/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiUrl = '/api/proyectos';

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl);
    }

    createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(this.apiUrl, project);
    }

    getProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/${id}`);
    }
}
