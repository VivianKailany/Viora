import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type LoginRequest = { login: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequest = { nameUser: string; login: string; password: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080/auth';
  private tokenKey = 'viora_token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.api}/login`, data)
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.token)));
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.api}/register`, data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
