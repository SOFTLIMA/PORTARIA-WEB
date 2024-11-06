import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { LoginService } from '../../../services/Login.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent implements OnInit{

  sair = false;

  constructor(private authService: AuthService, private loginService : LoginService, private router: Router){}

  async ngOnInit(): Promise<void> {
    this.loginService.value.subscribe(
      value => this.sair = value
    );
    await this.Validar();
  }

  async Validar(): Promise<void> {

    let session = await this.authService.getCurrentSession();

    if (session?.idToken?.toString() != undefined){
      // console.log(session?.idToken?.toString());
      this.loginService.changeValue(true);
    }
    else{
      this.loginService.changeValue(false);
    }
  }
}
