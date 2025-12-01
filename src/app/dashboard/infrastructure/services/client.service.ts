import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../domain/model/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:8080/api/clientes';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        console.log('Making GET request to:', this.apiUrl);
        return this.http.get<Client[]>(this.apiUrl, { headers: this.headers });
    }

    createClient(client: Client): Observable<Client> {
        console.log('Making POST request to:', this.apiUrl, 'with data:', client);
        return this.http.post<Client>(this.apiUrl, client, { headers: this.headers });
    }

    getClientById(id: number): Observable<Client> {
        const url = `${this.apiUrl}/${id}`;
        console.log('Making GET request to:', url);
        return this.http.get<Client>(url, { headers: this.headers });
    }
}
