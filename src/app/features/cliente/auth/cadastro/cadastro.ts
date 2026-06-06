import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatDividerModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  senhaVisivel = false;
  carregando = false;

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  get nome() { return this.form.get('nome'); }
  get email() { return this.form.get('email'); }
  get telefone() { return this.form.get('telefone'); }
  get endereco() { return this.form.get('endereco'); }
  get senha() { return this.form.get('senha'); }

  cadastrar() {
    if (this.form.invalid) return;
    this.carregando = true;

    setTimeout(() => {
      this.carregando = false;
      this.snackBar.open('Conta criada com sucesso!', '', { duration: 2000 });
      this.router.navigate(['/cardapio']);
    }, 1000);
  }
}