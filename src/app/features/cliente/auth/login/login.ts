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
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatDividerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  senhaVisivel = false;
  carregando = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() { return this.form.get('email'); }
  get senha() { return this.form.get('senha'); }

  entrar() {
    if (this.form.invalid) return;
    this.carregando = true;

    const { email, senha } = this.form.value;

    this.authService.login({ email: email!, senha: senha! }).subscribe({
      next: (res) => {
        this.carregando = false;
        this.snackBar.open(`Bem-vindo, ${res.nome}!`, '', { duration: 2000 });
        if (res.perfil === 'ADMIN' || res.perfil === 'GERENTE' || res.perfil === 'COZINHEIRO') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/cardapio']);
        }
      },
      error: (err) => {
        this.carregando = false;
        this.snackBar.open(err.error?.erro || 'Erro ao fazer login', 'Fechar', { duration: 3000 });
      }
    });
  }

  voltar() {
    this.router.navigate(['/cardapio']);
  }
}