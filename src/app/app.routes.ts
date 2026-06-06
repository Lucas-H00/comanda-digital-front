import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cardapio', pathMatch: 'full' },
  {
    path: 'cardapio',
    loadComponent: () =>
      import('./features/cliente/cardapio/cardapio')
        .then(m => m.Cardapio)
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./features/cliente/carrinho/carrinho')
        .then(m => m.Carrinho)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/cliente/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/cliente/auth/cadastro/cadastro')
        .then(m => m.Cadastro)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-layout/admin-layout')
        .then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'pratos',
        loadComponent: () =>
          import('./features/admin/pratos/pratos/pratos')
            .then(m => m.Pratos)
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/admin/categorias/categorias/categorias')
            .then(m => m.Categorias)
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./features/admin/pedidos/pedidos/pedidos')
            .then(m => m.Pedidos)
      }
    ]
  },
  { path: '**', redirectTo: 'cardapio' }
];