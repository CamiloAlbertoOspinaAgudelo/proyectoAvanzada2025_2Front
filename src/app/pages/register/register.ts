import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { repeat } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  cities: string[];
  registerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
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
  console.log(this.registerForm.value);
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
