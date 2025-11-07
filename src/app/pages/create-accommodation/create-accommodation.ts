import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PlacesService } from '../../services/places-service';
import { PlaceDTO } from '../../models/place-dto';

@Component({
  selector: 'app-create-accommodation',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-accommodation.html',
  styleUrl: './create-accommodation.css'
})
export class CreateAccommodation {

  cities: string[];
  createPlaceForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private placesService: PlacesService, private router: Router) {
    this.createForm();
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
  }

  private createForm() {
    this.createPlaceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priceNight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(1)]],
      capMax: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      photoUrls: [[], [Validators.required, this.atLeastOneFile]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        direction: ['', [Validators.required]],
        location: this.formBuilder.group({
          lat: ['', [Validators.required]],
          lng: ['', [Validators.required]]
        })
      }),
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
    if (this.createPlaceForm.invalid) {
    this.createPlaceForm.markAllAsTouched();
    Swal.fire("Error", "Por favor completa todos los campos.", "error");
    return;
  }

  const formValue = this.createPlaceForm.value;

  // Desestructuramos para más claridad
  const addressValue = formValue.address;
  const locationValue = addressValue.location;

  const newPlace: PlaceDTO = {
    id: Math.floor(Math.random() * 5000),
    title: formValue.title,
    description: formValue.description,
    photoUrls: (formValue.photoUrls || []).map((file: File) => file.name),
    services: Object.keys(formValue.services).filter(key => formValue.services[key]),
    capMax: Number(formValue.capMax),
    priceNight: Number(formValue.priceNight),
    hostId: '1', // Puedes cambiar esto por el id real del usuario autenticado
    address: {
      city: addressValue.city,
      direction: addressValue.direction,
      location: {
        lat: parseFloat(locationValue.lat),
        lng: parseFloat(locationValue.lng),
      }
    }
  };

  this.placesService.save(newPlace);

  Swal.fire("Éxito!", "Se ha creado un nuevo alojamiento.", "success");
  }

  private atLeastOneFile(control: FormControl) {
  const files = control.value;
  return files && files.length > 0 ? null : { required: true };
  }
}
