import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarrinhoService } from '../../../core/services/carrinho';
import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatDividerModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss'
})
export class Carrinho {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  carrinho = inject(CarrinhoService);

  enviando = false;

  get itens() { return this.carrinho.itensCarrinho(); }
  get total() { return this.carrinho.totalValor(); }

  aumentar(pratoId: number, qtdAtual: number) {
    this.carrinho.alterarQuantidade(pratoId, qtdAtual + 1);
  }

  diminuir(pratoId: number, qtdAtual: number) {
    this.carrinho.alterarQuantidade(pratoId, qtdAtual - 1);
  }

  remover(pratoId: number) {
    this.carrinho.remover(pratoId);
    this.snackBar.open('Item removido', '', { duration: 2000 });
  }

  voltarCardapio() {
    this.router.navigate(['/cardapio']);
  }

  finalizarPedido() {
    if (!this.authService.isLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    this.enviando = true;

    const pedidoRequest = {
      itens: this.itens.map(i => ({
        pratoId: i.prato.id,
        quantidade: i.quantidade,
        observacoes: i.observacoes
      })),
      enderecoEntrega: this.authService.usuarioLogado()?.email ?? '',
      observacoes: ''
    };

    this.apiService.criarPedido(pedidoRequest).subscribe({
      next: (pedido: any) => {
        this.enviando = false;
        this.carrinho.limpar();
        this.snackBar.open('Pedido realizado com sucesso!', '', { duration: 3000 });
        this.router.navigate(['/meu-pedido', pedido.id]);
      },
      error: (err: any) => {
        this.enviando = false;
        this.snackBar.open(err.error?.erro || 'Erro ao fazer pedido', 'Fechar', { duration: 3000 });
      }
    });
  }
}