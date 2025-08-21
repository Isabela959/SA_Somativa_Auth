import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './view/inicio/inicio.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { CurriculoFormComponent } from './view/curriculo-form/curriculo-form.component';
import { CurriculoListComponent } from './view/curriculo-list/curriculo-list.component';
import { LoginComponent } from './view/login/login.component';
import { RegistroComponent } from './view/registro/registro.component';
import { AuthGuard } from './guard/auth.guard';

// Importar os componentes que serão utilizados nas rotas
// Definir as rotas da aplicação
const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // redireciona raiz para início
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'curriculos', component: CurriculoListComponent, canActivate: [AuthGuard] }, // protegido
  { path: 'cadastrar-curriculo', component: CurriculoFormComponent, canActivate: [AuthGuard] }, // protegido
  { path: 'vagas', component: VagasComponent },
  { path: 'painel-vagas', component: PainelVagasComponent, canActivate: [AuthGuard] }, // protegido
  { path: '**', redirectTo: '/inicio' } // rota coringa
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
