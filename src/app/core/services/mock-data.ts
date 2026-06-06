import { Injectable } from '@angular/core';

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

export interface Prato {
  id: number;
  categoriaId: number;
  nome: string;
  descricao: string;
  fotoUrl: string;
  precoVenda: number;
  tempoPreparo: number;
  status: 'ATIVO' | 'INATIVO' | 'PAUSADO';
}

@Injectable({ providedIn: 'root' })
export class MockDataService {

  categorias: Categoria[] = [
    { id: 1, nome: 'Lanches', descricao: 'Hambúrgueres e sanduíches' },
    { id: 2, nome: 'Açaí', descricao: 'Tigelas e copos de açaí' },
    { id: 3, nome: 'Bebidas', descricao: 'Sucos e refrigerantes' },
    { id: 4, nome: 'Sobremesas', descricao: 'Doces artesanais' },
  ];

  pratos: Prato[] = [
    {
      id: 1, categoriaId: 1,
      nome: 'Hambúrguer Artesanal',
      descricao: 'Blend bovino 180g, queijo cheddar, alface, tomate e molho especial no pão brioche.',
      fotoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      precoVenda: 39.90, tempoPreparo: 20, status: 'ATIVO'
    },
    {
      id: 2, categoriaId: 1,
      nome: 'X-Bacon Duplo',
      descricao: 'Dois blends, bacon crocante, queijo prato, cebola caramelizada.',
      fotoUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
      precoVenda: 49.90, tempoPreparo: 25, status: 'ATIVO'
    },
    {
      id: 3, categoriaId: 2,
      nome: 'Açaí 500ml',
      descricao: 'Açaí puro batido na hora com granola, banana e mel.',
      fotoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      precoVenda: 22.00, tempoPreparo: 10, status: 'ATIVO'
    },
    {
      id: 4, categoriaId: 2,
      nome: 'Açaí 700ml Especial',
      descricao: 'Açaí com leite condensado, morango, granola e paçoca.',
      fotoUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      precoVenda: 32.00, tempoPreparo: 12, status: 'ATIVO'
    },
    {
      id: 5, categoriaId: 3,
      nome: 'Suco de Laranja 500ml',
      descricao: 'Suco natural espremido na hora, sem açúcar.',
      fotoUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
      precoVenda: 12.00, tempoPreparo: 5, status: 'ATIVO'
    },
    {
      id: 6, categoriaId: 4,
      nome: 'Brownie com Sorvete',
      descricao: 'Brownie quente de chocolate com bola de sorvete de creme.',
      fotoUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400',
      precoVenda: 18.00, tempoPreparo: 8, status: 'ATIVO'
    },
  ];

  getPratosAtivos(): Prato[] {
    return this.pratos.filter(p => p.status === 'ATIVO');
  }

  getPratosPorCategoria(categoriaId: number): Prato[] {
    return this.getPratosAtivos().filter(p => p.categoriaId === categoriaId);
  }

  getCategoriaNome(id: number): string {
    return this.categorias.find(c => c.id === id)?.nome ?? '';
  }
}