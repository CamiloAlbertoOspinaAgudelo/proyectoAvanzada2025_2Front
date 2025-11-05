import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.css'
})
export class RecoverPassword {

  recoverForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  private createForm(){
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    }
    );
  }

  public recover(){
    if (this.recoverForm.valid) {
      // Aquí normalmente llamarías a un servicio que envía el código por correo.
      // Para ahora, haremos solo la navegación simulando éxito.
      Swal.fire({
        icon: 'success',
        title: 'Código enviado',
        text: 'Revisa tu correo electrónico para continuar.'
      }).then(() => {
        this.router.navigate(['/reset-password']); // 👈 redirige a la vista deseada
      });
    } else {
      this.recoverForm.markAllAsTouched();
    }
  }
}
