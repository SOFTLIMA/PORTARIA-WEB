import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { LoginService } from '../../../services/Login.Service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

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

  signOut() {
    this.authService.signOut();
    this.loginService.changeValue(false);
    this.router.navigate(['login']);
  }

}
