import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
import { TokenService } from '../../services/token-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [RouterModule, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  
  user: any;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userService.get(this.userId).subscribe({
      next: (data) => {
        this.user = data.msg;
      },
      error: (error) => {
        Swal.fire('Error!', 'No se pudo cargar la información del usuario', 'error');
      }
    });
  }

  public deleteAccount(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(this.userId).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Tu cuenta ha sido eliminada', 'success');
            this.tokenService.logout();
            window.location.href = '/';
          },
          error: (error) => {
            Swal.fire('Error!', 'No se pudo eliminar la cuenta', 'error');
          }
        });
      }
    });
  }
}