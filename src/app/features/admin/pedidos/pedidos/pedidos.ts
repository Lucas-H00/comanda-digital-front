import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../../../core/services/api';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatSelectModule, MatFormFieldModule,
    MatSnackBarModule, MatTooltipModule, MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.scss'
})
export class Pedidos implements OnInit {
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);

  pedidos: any[] = [];
  carregando = true;
  pedidoSelecionado = signal<any>(null);
  filtroStatus = signal<string>('TODOS');

  statusFluxo = ['RECEBIDO', 'CONFIRMADO', 'EM_PREPARO', 'PRONTO', 'SAIU_ENTREGA', 'FINALIZADO'];

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.carregando = true;
    this.apiService.pedidosAdmin().subscribe({
      next: (res: any) => {
        this.pedidos = res.content || res;
        this.carregando = false;
      },
      error: () => this.carregando = false
    });
  }

  get pedidosFiltrados(): any[] {
    const f = this.filtroStatus();
    return f === 'TODOS' ? this.pedidos : this.pedidos.filter((p: any) => p.status === f);
  }

  getStatusCor(status: string): string {
    const cores: Record<string, string> = {
      RECEBIDO: '#2196f3', CONFIRMADO: '#9c27b0',
      EM_PREPARO: '#ff9800', PRONTO: '#4caf50',
      SAIU_ENTREGA: '#00bcd4', FINALIZADO: '#607d8b', CANCELADO: '#f44336'
    };
    return cores[status] || '#999';
  }

  getProximoStatus(status: string): string | null {
    const idx = this.statusFluxo.indexOf(status);
    return idx >= 0 && idx < this.statusFluxo.length - 1 ? this.statusFluxo[idx + 1] : null;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      RECEBIDO: 'Recebido', CONFIRMADO: 'Confirmado', EM_PREPARO: 'Em Preparo',
      PRONTO: 'Pronto', SAIU_ENTREGA: 'Saiu p/ Entrega',
      FINALIZADO: 'Finalizado', CANCELADO: 'Cancelado'
    };
    return labels[status] || status;
  }

  avancarStatus(pedido: any) {
    const proximo = this.getProximoStatus(pedido.status);
    if (!proximo) return;
    this.apiService.mudarStatusPedido(pedido.id, proximo).subscribe({
      next: (p: any) => {
        const idx = this.pedidos.findIndex((x: any) => x.id === pedido.id);
        if (idx >= 0) this.pedidos[idx] = p;
        this.snackBar.open(`Pedido #${pedido.id} → ${this.getStatusLabel(proximo)}`, '', { duration: 2000 });
      },
      error: () => this.snackBar.open('Erro ao atualizar status', '', { duration: 2000 })
    });
  }

  cancelar(pedido: any) {
    this.apiService.cancelarPedido(pedido.id, 'Cancelado pelo admin').subscribe({
      next: (p: any) => {
        const idx = this.pedidos.findIndex((x: any) => x.id === pedido.id);
        if (idx >= 0) this.pedidos[idx] = p;
        this.snackBar.open(`Pedido #${pedido.id} cancelado`, '', { duration: 2000 });
      },
      error: () => this.snackBar.open('Erro ao cancelar', '', { duration: 2000 })
    });
  }

  verDetalhe(pedido: any) {
    this.pedidoSelecionado.set(
      this.pedidoSelecionado()?.id === pedido.id ? null : pedido
    );
  }
}