import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../domain/model/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiUrl = 'https://colmena-back.onrender.com/api/proyectos';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        console.log('Making GET request to:', this.apiUrl);
        return this.http.get<Project[]>(this.apiUrl, { headers: this.headers });
    }

    createProject(project: Project): Observable<Project> {
        console.log('Making POST request to:', this.apiUrl, 'with data:', project);
        return this.http.post<Project>(this.apiUrl, project, { headers: this.headers });
    }

    getProjectById(id: number): Observable<Project> {
        const url = `${this.apiUrl}/${id}`;
        console.log('Making GET request to:', url);
        return this.http.get<Project>(url, { headers: this.headers });
    }
}
