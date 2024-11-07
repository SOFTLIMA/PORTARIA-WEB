import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {


  cadastrar() {
    throw new Error('Method not implemented.');
  }

}
