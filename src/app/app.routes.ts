import { Routes } from '@angular/router';
import { LoginComponent } from './Administracao/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PaginaNaoEncontradaComponent } from './Components/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'login'},
  {path: 'home', component: HomeComponent, title: 'home'},


  {path: '', redirectTo: '/home', pathMatch: 'full' , title: 'Home'},


  {path: '**', component: PaginaNaoEncontradaComponent, title: '404'},
];
