import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MockDataService, Categoria } from '../../../../core/services/mock-data';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatTableModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule,
    MatChipsModule, MatSnackBarModule, MatDialogModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  mockData = inject(MockDataService);

  colunas = ['id', 'nome', 'descricao', 'acoes'];
  modoEdicao = signal<number | null>(null);
  mostrarFormulario = signal(false);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    descricao: ['', Validators.required]
  });

  get nome() { return this.form.get('nome'); }
  get descricao() { return this.form.get('descricao'); }

  abrirFormulario() {
    this.form.reset();
    this.modoEdicao.set(null);
    this.mostrarFormulario.set(true);
  }

  editar(cat: Categoria) {
    this.form.patchValue({ nome: cat.nome, descricao: cat.descricao });
    this.modoEdicao.set(cat.id);
    this.mostrarFormulario.set(true);
  }

  cancelar() {
    this.mostrarFormulario.set(false);
    this.modoEdicao.set(null);
    this.form.reset();
  }

  salvar() {
    if (this.form.invalid) return;
    const { nome, descricao } = this.form.value;
    const id = this.modoEdicao();

    if (id) {
      const idx = this.mockData.categorias.findIndex(c => c.id === id);
      this.mockData.categorias[idx] = { id, nome: nome!, descricao: descricao! };
      this.snackBar.open('Categoria atualizada!', '', { duration: 2000 });
    } else {
      const novoId = Math.max(...this.mockData.categorias.map(c => c.id)) + 1;
      this.mockData.categorias.push({ id: novoId, nome: nome!, descricao: descricao! });
      this.snackBar.open('Categoria criada!', '', { duration: 2000 });
    }

    this.cancelar();
  }

  desativar(id: number) {
    this.mockData.categorias = this.mockData.categorias.filter(c => c.id !== id);
    this.snackBar.open('Categoria removida!', '', { duration: 2000 });
  }
}
