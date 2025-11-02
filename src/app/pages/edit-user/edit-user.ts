import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser {

  editUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.editUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      photoUrl: [''],
      dateBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    },
    );
  }

  public editUser(){
    console.log(this.editUserForm.value);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.editUserForm.patchValue({ photoUrl: files });
    }
  }
}
