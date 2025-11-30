import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../domain/model/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = '/api/clientes'; // Proxy configuration should handle localhost:8080

    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.apiUrl, client);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}/${id}`);
    }
}
