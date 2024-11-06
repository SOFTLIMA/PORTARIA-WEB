import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Administracao/login/login.component";
import { MenuComponent } from "./Components/menu/menu.component";
import { RodapeComponent } from "./Components/rodape/rodape.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'PORTARIA-WEB';
}
