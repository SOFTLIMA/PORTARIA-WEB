import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { CorpoLoginComponent } from "../corpo-login/corpo-login.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { LoginService } from '../../../services/Login.Service';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_8KkHocSfT',
      userPoolClientId: '5rej1r2d415a0est3q5a3vtt9p',
    }
  },
});

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, CommonModule, CorpoLoginComponent, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };

  constructor(private authService: AuthService, private loginService : LoginService, private router: Router){}


  async onAuthStateChange(event: any) {
    console.log('AuthState:', event.authState); // Verifique o estado de autenticação
    console.log('User:', event.user);           // Verifique o usuário

    if (event.authState === 'signedIn') {
      console.log('Usuário autenticado:', event.user);

      // Navegar para a página do dashboard após o login
      this.router.navigate(['/home']);
    } else if (event.authState === 'signedOut') {
      console.log('Usuário deslogado');

      // Navegar de volta para a página de login após o logout
      this.router.navigate(['/login']);
    }
  }
}
