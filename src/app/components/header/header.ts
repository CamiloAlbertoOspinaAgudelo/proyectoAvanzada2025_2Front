import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected readonly title = signal('Alojha');
  isLogged = false;
  email: string = "";
  rol: string = "";

  constructor(private tokenService: TokenService, private router: Router) {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.rol = this.tokenService.getRole();
      console.log('Rol del usuario:', this.rol);
    }
  }

  public logout() {
    // Borrar token del sessionStorage
    this.tokenService.logout();
    // Redirigir al inicio y recargar la página
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
