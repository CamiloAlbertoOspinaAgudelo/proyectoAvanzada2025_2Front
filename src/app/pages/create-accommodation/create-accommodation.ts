import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-create-accommodation',
  imports: [ReactiveFormsModule],
  templateUrl: './create-accommodation.html',
  styleUrl: './create-accommodation.css'
})
export class CreateAccommodation {

  cities: string[];
  createPlaceForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private placesService: PlacesService) {
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
      priceNight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(1)]],
      capMax: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      photoUrls: [[], [Validators.required, this.atLeastOneFile]],
      services: this.formBuilder.group({
        wifi: [false],
        parking: [false],
        breakfast: [false],
        pool: [false],
        petsAllowed: [false],
      }),
    });
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.createPlaceForm.patchValue({ photoUrls: files });
    }
  }

  public createNewPlace() {
    this.placesService.save(this.createPlaceForm.value);
    Swal.fire("Exito!", "Se ha creado un nuevo alojamiento.", "success");
  }

  private atLeastOneFile(control: FormControl) {
  const files = control.value;
  return files && files.length > 0 ? null : { required: true };
  }
}
