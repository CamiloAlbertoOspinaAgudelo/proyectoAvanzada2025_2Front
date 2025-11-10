import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlacesService } from '../../services/places-service';
import { MapService } from '../../services/map-service';

@Component({
  selector: 'app-create-accommodation',
  imports: [ReactiveFormsModule],
  templateUrl: './create-accommodation.html',
  styleUrl: './create-accommodation.css'
})
export class CreateAccommodation {

  cities: string[];
  createPlaceForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private placesService: PlacesService, private mapService: MapService) {
    this.createForm();
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
  }

  private createForm() {
    this.createPlaceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priceNight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      capMax: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      photoUrls: [[], [Validators.required, this.atLeastOneFile]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        direction: ['', [Validators.required]],
        location: this.formBuilder.group({
          lat: ['', [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]+)?$/)]],
          lng: ['', [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]+)?$/)]],
        }),
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
    this.placesService.save(this.createPlaceForm.value);
    Swal.fire("Exito!", "Se ha creado un nuevo alojamiento.", "success");
  }

  private atLeastOneFile(control: FormControl) {
    const files = control.value;
    return files && files.length > 0 ? null : { required: true };
  }

  ngOnInit(): void {
    // Inicializa el mapa con la configuración predeterminada
    this.mapService.create();
    // Se suscribe al evento de agregar marcador y actualiza el formulario
    this.mapService.addMarker().subscribe((marker) => {
      this.createPlaceForm.get('address.location')?.setValue({
        lat: marker.lat,
        lng: marker.lng,
      });
    });
  }

}
