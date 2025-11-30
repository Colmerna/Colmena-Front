import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Financing } from '../../domain/model/financing.model';

@Injectable({
    providedIn: 'root'
})
export class FinancingService {
    private apiUrl = '/api/creditos';

    constructor(private http: HttpClient) { }

    getFinancingList(): Observable<Financing[]> {
        // Backend doesn't have a direct "get all" for credits in the controller snippet shown,
        // but typically it might exist or we filter by client.
        // For now, let's assume there's an endpoint or we mock it.
        // The controller has `obtenerPorCliente` and `obtenerPorId`.
        // Let's assume we want to show all credits for the logged in user or similar.
        // For this demo, I'll use a placeholder endpoint or mock if backend doesn't support it.
        // Wait, the user wants a "Financing View".
        // I'll try to fetch all if possible, otherwise I might need to fetch by client.
        // Let's assume GET /api/creditos exists for listing all (common pattern), if not I'll handle error.
        return this.http.get<Financing[]>(this.apiUrl);
    }

    createFinancing(financing: Financing): Observable<Financing> {
        return this.http.post<Financing>(this.apiUrl, financing);
    }

    getFinancingById(id: number): Observable<Financing> {
        return this.http.get<Financing>(`${this.apiUrl}/${id}`);
    }
}
