import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  endereco?: string;
}

export interface AuthResponse {
  token: string;
  nome: string;
  email: string;
  perfil: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  usuarioLogado = signal<AuthResponse | null>(this.carregarUsuario());

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res));
        this.usuarioLogado.set(res);
      })
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res));
        this.usuarioLogado.set(res);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioLogado.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogado(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const u = this.usuarioLogado();
    return u?.perfil === 'ADMIN' || u?.perfil === 'GERENTE';
  }

  private carregarUsuario(): AuthResponse | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }
}