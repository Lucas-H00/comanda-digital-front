import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, PratoAPI, CategoriaAPI } from '../../../core/services/api';
import { CarrinhoService } from '../../../core/services/carrinho';
import { Prato } from '../../../core/services/mock-data';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe,
    MatCardModule, MatButtonModule, MatChipsModule,
    MatIconModule, MatBadgeModule, MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.scss'
})
export class Cardapio implements OnInit {
  private apiService = inject(ApiService);
  private carrinho = inject(CarrinhoService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  categorias: CategoriaAPI[] = [];
  pratos: PratoAPI[] = [];
  categoriaSelecionada = signal<number | null>(null);
  carregando = signal(true);

  get pratosFiltrados(): PratoAPI[] {
    const cat = this.categoriaSelecionada();
    return cat ? this.pratos.filter(p => p.categoriaId === cat) : this.pratos;
  }

  get totalCarrinho() { return this.carrinho.totalItens(); }

  ngOnInit() {
    this.apiService.getCategorias().subscribe(cats => this.categorias = cats);
    this.apiService.getCardapio().subscribe({
      next: pratos => {
        this.pratos = pratos;
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  filtrarCategoria(id: number | null) {
    this.categoriaSelecionada.set(id);
  }

  adicionarAoCarrinho(prato: PratoAPI) {
    const pratoConvertido: Prato = {
      id: prato.id,
      nome: prato.nome,
      descricao: prato.descricao,
      fotoUrl: prato.fotoUrl,
      precoVenda: prato.precoVenda,
      tempoPreparo: prato.tempoPreparo,
      categoriaId: prato.categoriaId,
      status: prato.status as any
    };
    this.carrinho.adicionar(pratoConvertido, 1);
    this.snackBar.open(`${prato.nome} adicionado!`, 'Ver carrinho', {
      duration: 3000
    }).onAction().subscribe(() => this.router.navigate(['/carrinho']));
  }

  irParaCarrinho() { this.router.navigate(['/carrinho']); }

  getCategoriaNome(id: number): string {
    return this.categorias.find(c => c.id === id)?.nome ?? '';
  }
}