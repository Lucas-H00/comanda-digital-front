import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PratoAPI {
  id: number;
  nome: string;
  descricao: string;
  fotoUrl: string;
  precoVenda: number;
  tempoPreparo: number;
  categoriaId: number;
  categoriaNome: string;
  status: string;
}

export interface CategoriaAPI {
  id: number;
  nome: string;
  descricao: string;
  ordem: number;
  status: string;
}

export interface IngredienteAPI {
  id: number;
  nome: string;
  sku: string;
  unidadePadrao: string;
  estoqueMinimo: number;
  custoUnitario: number;
  saldoAtual: number;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Cardápio público
  getCardapio(categoriaId?: number): Observable<PratoAPI[]> {
    let params = new HttpParams();
    if (categoriaId) params = params.set('categoriaId', categoriaId);
    return this.http.get<PratoAPI[]>(`${this.base}/cardapio`, { params });
  }

  getCategorias(): Observable<CategoriaAPI[]> {
    return this.http.get<CategoriaAPI[]>(`${this.base}/cardapio/categorias`);
  }

  getPrato(id: number): Observable<PratoAPI> {
    return this.http.get<PratoAPI>(`${this.base}/cardapio/${id}`);
  }

  // Admin - Pratos
  getPratosAdmin(): Observable<PratoAPI[]> {
    return this.http.get<PratoAPI[]>(`${this.base}/admin/pratos`);
  }

  criarPrato(prato: Partial<PratoAPI>): Observable<PratoAPI> {
    return this.http.post<PratoAPI>(`${this.base}/admin/pratos`, prato);
  }

  atualizarPrato(id: number, prato: Partial<PratoAPI>): Observable<PratoAPI> {
    return this.http.put<PratoAPI>(`${this.base}/admin/pratos/${id}`, prato);
  }

  deletarPrato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/pratos/${id}`);
  }

  // Admin - Categorias
  getCategoriasAdmin(): Observable<CategoriaAPI[]> {
    return this.http.get<CategoriaAPI[]>(`${this.base}/admin/categorias`);
  }

  criarCategoria(cat: Partial<CategoriaAPI>): Observable<CategoriaAPI> {
    return this.http.post<CategoriaAPI>(`${this.base}/admin/categorias`, cat);
  }

  atualizarCategoria(id: number, cat: Partial<CategoriaAPI>): Observable<CategoriaAPI> {
    return this.http.put<CategoriaAPI>(`${this.base}/admin/categorias/${id}`, cat);
  }

  deletarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/categorias/${id}`);
  }

  // Admin - Ingredientes
  getIngredientes(): Observable<IngredienteAPI[]> {
    return this.http.get<IngredienteAPI[]>(`${this.base}/admin/ingredientes`);
  }

  getAlertasEstoque(): Observable<IngredienteAPI[]> {
    return this.http.get<IngredienteAPI[]>(`${this.base}/admin/ingredientes/alertas`);
  }

  // Pedidos
criarPedido(pedido: any): Observable<any> {
  return this.http.post(`${this.base}/pedidos`, pedido);
}

meusPedidos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.base}/pedidos/meus`);
}

statusPedido(id: number): Observable<any> {
  return this.http.get(`${this.base}/pedidos/${id}/status`);
}

pedidosAdmin(page: number = 0): Observable<any> {
  return this.http.get(`${this.base}/admin/pedidos?page=${page}&size=20`);
}

mudarStatusPedido(id: number, status: string): Observable<any> {
  return this.http.patch(`${this.base}/admin/pedidos/${id}/status?status=${status}`, {});
}

cancelarPedido(id: number, motivo: string): Observable<any> {
  return this.http.patch(`${this.base}/admin/pedidos/${id}/cancelar?motivo=${motivo}`, {});
}
}