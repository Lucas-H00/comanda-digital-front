import { Injectable, signal, computed } from '@angular/core';
import { Prato } from './mock-data';

export interface ItemCarrinho {
  prato: Prato;
  quantidade: number;
  observacoes: string;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {

  private itens = signal<ItemCarrinho[]>([]);

  readonly itensCarrinho = this.itens.asReadonly();

  readonly totalItens = computed(() =>
    this.itens().reduce((acc, i) => acc + i.quantidade, 0)
  );

  readonly totalValor = computed(() =>
    this.itens().reduce((acc, i) => acc + i.prato.precoVenda * i.quantidade, 0)
  );

  adicionar(prato: Prato, quantidade: number, observacoes: string = '') {
    const atual = this.itens();
    const idx = atual.findIndex(i => i.prato.id === prato.id);
    if (idx >= 0) {
      const novo = [...atual];
      novo[idx] = { ...novo[idx], quantidade: novo[idx].quantidade + quantidade };
      this.itens.set(novo);
    } else {
      this.itens.set([...atual, { prato, quantidade, observacoes }]);
    }
  }

  remover(pratoId: number) {
    this.itens.set(this.itens().filter(i => i.prato.id !== pratoId));
  }

  alterarQuantidade(pratoId: number, quantidade: number) {
    if (quantidade <= 0) { this.remover(pratoId); return; }
    this.itens.set(
      this.itens().map(i => i.prato.id === pratoId ? { ...i, quantidade } : i)
    );
  }

  limpar() { this.itens.set([]); }
}