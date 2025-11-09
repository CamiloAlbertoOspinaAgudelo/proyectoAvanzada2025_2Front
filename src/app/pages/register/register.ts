import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { repeat } from 'rxjs';
import { UserService } from '../../services/user-service';
import Swal from 'sweetalert2';
import { CreateUserDTO } from '../../models/create-user-dto';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  cities: string[];
  registerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.createForm();
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      photoUrl: [''],
      dateBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    {validators: this.passwordsMatchValidator} as AbstractControlOptions
    );
  }

  public createUser() {
    // Obtenemos los datos del formulario y los convertimos a CreateUserDTO
    const createUserDTO = this.registerForm.value as CreateUserDTO;

    this.userService.create(createUserDTO).subscribe({
      next: (data) => {
        // Mostramos el mensaje de éxito del backend
        Swal.fire({
          title: 'Éxito',
          text: data.msg,
          icon: 'success'
        });
      },
      error: (error) => {
        // Mostramos el mensaje de error del backend
        Swal.fire({
          title: 'Error',
          text: error.error.msg,
          icon: 'error'
        });
      }
    });
  }

  public passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('repeatPassword')?.value;

    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password == confirmaPassword ? null : { passwordsMismatch: true };
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.registerForm.patchValue({ photoUrl: files });
    }
  }

}
