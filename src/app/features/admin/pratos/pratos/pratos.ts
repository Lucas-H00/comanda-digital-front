import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockDataService, Prato } from '../../../../core/services/mock-data';

@Component({
  selector: 'app-pratos',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, ReactiveFormsModule,
    MatCardModule, MatTableModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatChipsModule, MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './pratos.html',
  styleUrl: './pratos.scss'
})
export class Pratos {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  mockData = inject(MockDataService);

  colunas = ['foto', 'nome', 'categoria', 'preco', 'tempo', 'status', 'acoes'];
  modoEdicao = signal<number | null>(null);
  mostrarFormulario = signal(false);

  form = this.fb.group({
    nome:        ['', [Validators.required, Validators.minLength(3)]],
    descricao:   ['', Validators.required],
    fotoUrl:     ['', Validators.required],
    precoVenda:  [0,  [Validators.required, Validators.min(0.01)]],
    tempoPreparo:[0,  [Validators.required, Validators.min(1)]],
    categoriaId: [0,  Validators.required],
    status:      ['ATIVO' as 'ATIVO' | 'INATIVO' | 'PAUSADO', Validators.required]
  });

  get nome()         { return this.form.get('nome'); }
  get descricao()    { return this.form.get('descricao'); }
  get fotoUrl()      { return this.form.get('fotoUrl'); }
  get precoVenda()   { return this.form.get('precoVenda'); }
  get tempoPreparo() { return this.form.get('tempoPreparo'); }
  get categoriaId()  { return this.form.get('categoriaId'); }

  getCategoriaNome(id: number) {
    return this.mockData.getCategoriaNome(id);
  }

  getStatusCor(status: string) {
    return status === 'ATIVO' ? 'primary' : status === 'PAUSADO' ? 'accent' : undefined;
  }

  abrirFormulario() {
    this.form.reset({ status: 'ATIVO', precoVenda: 0, tempoPreparo: 0, categoriaId: 0 });
    this.modoEdicao.set(null);
    this.mostrarFormulario.set(true);
  }

  editar(prato: Prato) {
    this.form.patchValue({
      nome: prato.nome,
      descricao: prato.descricao,
      fotoUrl: prato.fotoUrl,
      precoVenda: prato.precoVenda,
      tempoPreparo: prato.tempoPreparo,
      categoriaId: prato.categoriaId,
      status: prato.status
    });
    this.modoEdicao.set(prato.id);
    this.mostrarFormulario.set(true);
  }

  cancelar() {
    this.mostrarFormulario.set(false);
    this.modoEdicao.set(null);
    this.form.reset();
  }

  salvar() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const id = this.modoEdicao();

    if (id) {
      const idx = this.mockData.pratos.findIndex(p => p.id === id);
      this.mockData.pratos[idx] = {
        id,
        nome: v.nome!,
        descricao: v.descricao!,
        fotoUrl: v.fotoUrl!,
        precoVenda: Number(v.precoVenda),
        tempoPreparo: Number(v.tempoPreparo),
        categoriaId: Number(v.categoriaId),
        status: v.status!
      };
      this.snackBar.open('Prato atualizado!', '', { duration: 2000 });
    } else {
      const novoId = Math.max(...this.mockData.pratos.map(p => p.id)) + 1;
      this.mockData.pratos.push({
        id: novoId,
        nome: v.nome!,
        descricao: v.descricao!,
        fotoUrl: v.fotoUrl!,
        precoVenda: Number(v.precoVenda),
        tempoPreparo: Number(v.tempoPreparo),
        categoriaId: Number(v.categoriaId),
        status: v.status!
      });
      this.snackBar.open('Prato criado!', '', { duration: 2000 });
    }
    this.cancelar();
  }

  desativar(id: number) {
    const idx = this.mockData.pratos.findIndex(p => p.id === id);
    this.mockData.pratos[idx].status = 'INATIVO';
    this.snackBar.open('Prato desativado!', '', { duration: 2000 });
  }
}