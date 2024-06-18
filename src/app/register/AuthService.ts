import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthResponse } from '../interface/AuthResponse';  // Asegúrate de que el path es correcto


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  private apiUrl = 'http://localhost:8080/api/auth'; // Cambia esta URL según tu configuración backend

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe( 
      tap(response => {
      if (response.token) {
        this.setToken(response.token);
      }
    })
  );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
