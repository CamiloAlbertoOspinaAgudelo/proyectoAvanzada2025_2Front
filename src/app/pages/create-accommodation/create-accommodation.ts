import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-accommodation',
  imports: [ReactiveFormsModule],
  templateUrl: './create-accommodation.html',
  styleUrl: './create-accommodation.css'
})
export class CreateAccommodation {

  cities: string[];
  createPlaceForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
  }

  private createForm() {
    this.createPlaceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      location: ['', [Validators.required]], // Luego se puede mejorar con un mapa
      pricePerNight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(1)]],
      maxGuests: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      images: [[], [Validators.required]]
    });
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.createPlaceForm.patchValue({ images: files });
    }
  }

  public createNewPlace() {
    console.log(this.createPlaceForm.value);
  }
}
