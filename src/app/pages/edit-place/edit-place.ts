import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaceDTO } from '../../models/place-dto';
import { PlacesService } from '../../services/places-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-place',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-place.html',
  styleUrl: './edit-place.css'
})
export class EditPlace {

  editPlaceForm!: FormGroup;
  placeId: string = '';
  place: PlaceDTO | undefined;
  cities: string[];
  
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private placesService: PlacesService
  ) { this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];}

  ngOnInit(): void {
    // Obtenemos el ID desde la URL
    this.route.params.subscribe(params => {
      this.placeId = params['id'];
      this.loadPlace(this.placeId);
    });

    // Inicializamos el formulario vacío
    this.initForm();
  }

  private initForm(): void {
    this.editPlaceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      pricePerNight: [null, [Validators.required, Validators.min(1)]],
      maxGuests: [null, [Validators.required, Validators.min(1)]],
      services: this.fb.group({
        wifi: [false],
        parking: [false],
        breakfast: [false],
        pool: [false],
        petsAllowed: [false],
      }),
    });
  }

  private loadPlace(id: string): void {
    const data = this.placesService.get(parseInt(id));
    if (data) {
      this.place = data;
      this.patchForm(data);
    }
  }

  private patchForm(place: PlaceDTO): void {
    this.editPlaceForm.patchValue({
      title: place.title,
      description: place.description,
      city: place.address?.city,
      address: place.address?.direction,
      location: `${place.address?.location.lat},${place.address?.location.lng}`,
      pricePerNight: place.PriceNight,
      maxGuests: place.capMax,
      services: {
        wifi: place.services.includes('wifi'),
        parking: place.services.includes('parking'),
        breakfast: place.services.includes('breakfast'),
        pool: place.services.includes('pool'),
        petsAllowed: place.services.includes('petsAllowed'),
      }
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  updatePlace(): void {
    if (this.editPlaceForm.invalid) {
      this.editPlaceForm.markAllAsTouched();
      Swal.fire("Exito!", "Se ha modificado el alojamiento.", "success");
      return;
    }

    const formValue = this.editPlaceForm.value;

    const [lat, lng] = formValue.location.split(',').map((v: string) => parseFloat(v.trim()));

    const updated: PlaceDTO = {
      id: parseInt(this.placeId),
      title: formValue.title,
      description: formValue.description,
      photoUrls: this.place?.photoUrls || [],
      services: Object.keys(formValue.services)
        .filter(key => formValue.services[key]),
      capMax: formValue.maxGuests,
      PriceNight: formValue.pricePerNight,
      hostId: this.place?.hostId || '',
      address: {
        city: formValue.city,
        direction: formValue.address,
        location: { lat, lng }
      }
    };

    // Actualizamos en el servicio
    this.placesService.update( parseInt(this.placeId), updated);

    alert('Alojamiento actualizado correctamente');
    this.router.navigate(['/my-places']);
  }
}
