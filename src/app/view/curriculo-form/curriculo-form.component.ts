import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/service/curriculo.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.scss']
})
export class CurriculoFormComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo(0, '', '', '', '', '', '', '', '', '');
  public curriculos: Curriculo[] = [];
  public usuarioEAdmin: boolean = false; // controle para exibir a lista

  constructor(
    private _curriculoService: CurriculoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário logado é admin
    const usuario = this.authService.getUsuarioAtual();
    this.usuarioEAdmin = usuario?.role === 'admin'; // ajuste o campo conforme seu backend

    // Só lista os currículos se for admin
    if (this.usuarioEAdmin) {
      this.listarCurriculos();
    }
  }

  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe(
      (retornoCurriculo) => {
        this.curriculos = retornoCurriculo.map(item => Curriculo.fromMap(item));
      }
    );
  }

  listarCurriculoUnico(curriculo: Curriculo) {
    this.curriculo = curriculo;
  }

  cadastrar() {
    if (
      !this.curriculo.nome ||
      !this.curriculo.email ||
      !this.curriculo.telefone ||
      !this.curriculo.endereco ||
      !this.curriculo.resumo ||
      !this.curriculo.experiencia ||
      !this.curriculo.formacao ||
      !this.curriculo.idioma ||
      !this.curriculo.habilidades
    ) {
      alert("Todos os Campos Devem ser Preenchidos.");
      return;
    }

    if (!this.curriculo.email.endsWith("@gmail.com")) {
      alert("Email Inválido");
      return;
    }

    this._curriculoService.cadastrarCurriculo(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', '', '', '', '', '', '', '', '');
        if (this.usuarioEAdmin) this.listarCurriculos();
        alert("Currículo Cadastrado com Sucesso!");
      },
      (err) => {
        console.error('Erro ao cadastrar currículo', err);
      }
    );
  }

  atualizar(id: number) {
    this._curriculoService.atualizarCurriculo(id, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', '', '', '', '', '', '', '', '');
        if (this.usuarioEAdmin) this.listarCurriculos();
      },
      (err) => {
        console.error('Erro ao atualizar currículo', err);
      }
    );
  }

  excluir(id: number) {
    this._curriculoService.removerCurriculo(id).subscribe(
      () => {
        if (this.usuarioEAdmin) this.listarCurriculos();
      },
      (err) => {
        console.error('Erro ao excluir currículo', err);
      }
    );
  }
}
