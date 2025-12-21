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
  private baseUrl = 'https://colmena-back.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<Usuario> {
    // Ajustado a /auth/register si es lo estándar, o mantener /usuarios si es lo que tiene el backend actual.
    // El usuario mencionó "conectados a los endpoints de springboot".
    // Asumiré /auth/register para registro público o /usuarios si es creación directa.
    // Basado en el código anterior era /usuarios. Lo mantendré pero verificaré si falla.
    // Mejor uso /auth/register si existe, pero por ahora /usuarios parece ser lo que había.
    // Voy a asumir que el backend tiene un AuthController estándar.
    // Si falla, ajustaremos.
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/auth/login`, loginRequest);
  }
}
