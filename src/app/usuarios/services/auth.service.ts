import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  password?: string; // Opcional en respuesta
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api'; // Ajusta si el backend está en otro puerto

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<Usuario> {
    console.log('Calling register API:', `${this.baseUrl}/usuarios`, registerRequest);
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<Usuario> {
    console.log('Calling login API:', `${this.baseUrl}/auth/login`, loginRequest);
    return this.http.post<Usuario>(`${this.baseUrl}/auth/login`, loginRequest);
  }
}
