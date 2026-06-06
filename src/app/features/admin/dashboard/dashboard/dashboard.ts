import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService } from '../../../../core/services/mock-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, RouterLink,
    MatCardModule, MatIconModule, MatButtonModule, MatChipsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private mockData = inject(MockDataService);

  kpis = [
    { label: 'Faturamento do dia', valor: 'R$ 1.240,00', icon: 'attach_money', cor: '#4caf50' },
    { label: 'Pedidos hoje',       valor: '18',           icon: 'receipt_long',  cor: '#2196f3' },
    { label: 'Ticket médio',       valor: 'R$ 68,88',     icon: 'trending_up',   cor: '#ff9800' },
    { label: 'Food cost médio',    valor: '32%',          icon: 'pie_chart',     cor: '#9c27b0' },
  ];

  alertasEstoque = [
    { nome: 'Blend bovino', atual: 200, minimo: 500, unidade: 'g' },
    { nome: 'Pão brioche',  atual: 3,   minimo: 10,  unidade: 'un' },
    { nome: 'Alface',       atual: 150, minimo: 300, unidade: 'g' },
  ];

  topPratos = [
    { nome: 'Hambúrguer Artesanal', vendas: 42 },
    { nome: 'X-Bacon Duplo',        vendas: 31 },
    { nome: 'Açaí 500ml',           vendas: 28 },
    { nome: 'Brownie com Sorvete',  vendas: 19 },
    { nome: 'Suco de Laranja',      vendas: 15 },
  ];

  get totalPratos() { return this.mockData.getPratosAtivos().length; }
  get totalCategorias() { return this.mockData.categorias.length; }
}