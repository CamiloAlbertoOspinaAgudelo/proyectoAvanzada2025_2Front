import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditUserDTO } from '../../models/edit-user-dto';
import { UserService } from '../../services/user-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser {

  editUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,  private userService: UserService) {
    this.createForm();
  }

  private createForm() {
    this.editUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      photoUrl: [''],
      dateBirth: ['', [Validators.required]],
    },
    );
  }

  public editUser() {
    const editUserDTO = this.editUserForm.value as EditUserDTO;
    this.userService.edit(editUserDTO).subscribe({
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
              text: this.convertirAString(error.error.msg),
              icon: 'error'
            });
          }
        });
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.editUserForm.patchValue({ photoUrl: files });
    }
  }

  public convertirAString(data: any) {

    let result = Array.isArray(data)
      ? data.map(e => `${e.field}: ${e.defaultMessage}`).join(", ")
      : data;

    return result;

  }
}
