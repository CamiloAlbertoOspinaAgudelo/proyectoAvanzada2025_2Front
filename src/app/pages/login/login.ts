import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { TokenService } from '../../services/token-service';
import { LoginDTO } from '../../models/login-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
    
  }

  /*public login() {
    // Obtenemos los datos del formulario y los convertimos a LoginDTO
    const loginDTO = this.loginForm.value as LoginDTO;

    this.authService.login(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.content.token); // Guardamos el token usando el servicio de token
        this.router.navigate(['/']).then(() => window.location.reload()); // Redireccionamos al inicio y  recargamos la página
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.content // Mostramos el mensaje de error del backend
        });
      }
    });
  }*/
}
