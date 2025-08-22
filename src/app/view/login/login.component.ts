import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credenciais = { email: this.email, senha: this.senha };

    this.authService.login(credenciais).subscribe({
      next: (autenticado) => {
        if (autenticado) {
          alert('Login realizado com sucesso!');
          // Redireciona para a página de vagas
          this.router.navigate(['/']); 
        } else {
          alert('Email ou senha incorretos!');
        }
      },
      error: (erro) => {
        alert('Ocorreu um erro no login: ' + erro.message);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  // Método opcional para verificar se o usuário está logado
  estaLogado(): boolean {
    return this.authService.estaAutenticado();
  }
}
