import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/service/curriculo.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-curriculo-list',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss']
})
export class CurriculoListComponent implements OnInit {
  public curriculos: Curriculo[] = [];
  public usuarioEAdmin: boolean = false;

  constructor(
    private _curriculoService: CurriculoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const usuarioAtual = this.authService.getUsuarioAtual();
    this.usuarioEAdmin = usuarioAtual && usuarioAtual.tipo === 'admin'; // verifica se é admin

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
}
