import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatIconModule, MatButtonModule, MatDividerModule
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  private router = inject(Router);

  menuItems = [
    { label: 'Dashboard',   icon: 'dashboard',      rota: '/admin/dashboard' },
    { label: 'Pedidos',     icon: 'receipt_long',   rota: '/admin/pedidos' },
    { label: 'Pratos',      icon: 'restaurant_menu', rota: '/admin/pratos' },
    { label: 'Categorias',  icon: 'category',       rota: '/admin/categorias' },
  ];

  sair() {
    this.router.navigate(['/cardapio']);
  }
}