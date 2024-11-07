import { DynamicFormComponent } from './Components/dynamic-form/dynamic-form.component';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './Administracao/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PaginaNaoEncontradaComponent } from './Components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { authGuard } from './Administracao/shared/auth.guard';
import { FuncionariosComponent } from './Components/funcionarios/funcionarios.component';
import { VeiculosComponent } from './Components/veiculos/veiculos.component';
import { VisitantesComponent } from './Components/visitantes/visitantes.component';
import { VazioComponent } from './Components/vazio/vazio.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: '', redirectTo: 'login', pathMatch: 'full' , title: 'Login'},

  {path: 'home', component: HomeComponent, title: 'Home', canActivate: [authGuard]},
  {path: 'funcionarios',
    component: FuncionariosComponent,
    title: 'Funcionarios',
    canActivate: [authGuard],
    children: [
      // {path: '', redirectTo: 'form', pathMatch: 'full'},
      {
        path: '', // Rota filha
        canActivate: [authGuard],
        component: VazioComponent
      },
      {
        path: 'form', // Rota filha
        canActivate: [authGuard],
        component: DynamicFormComponent
      },
      {path: '**', component: VazioComponent,  canActivate: [authGuard]},
    ]
    },

  // {path: 'veiculos', component: VeiculosComponent, title: 'Veiculos', canActivate: [authGuard]},
  // {path: 'visitantes', component: VisitantesComponent, title: 'Visitantes', canActivate: [authGuard]},



  {path: '**', component: PaginaNaoEncontradaComponent, title: '404', canActivate: [authGuard]},
];
