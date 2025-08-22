import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registro', // mudou de cadastro para registro
  templateUrl: './registro.component.html', 
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: 'comum' // define o tipo do usuário
    };

    this.authService.registrar(usuario).subscribe({
      next: () => {
        alert('Usuário registrado com sucesso!');
        this.router.navigate(['/login']); // redireciona para login
      },
      error: (erro) => {
        alert(erro.message);
      }
    });
  }
}
