import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlacesService } from '../../services/places-service';
import { MapService } from '../../services/map-service';
import { PlaceDTO } from '../../models/place-dto';
import { PlaceServicesService } from '../../services/place-services-service';
import { ImageService } from '../../services/image-service';
import { CreatePlaceDTO } from '../../models/create-place-dto';

@Component({
  selector: 'app-create-accommodation',
  imports: [ReactiveFormsModule],
  templateUrl: './create-accommodation.html',
  styleUrl: './create-accommodation.css'
})
export class CreateAccommodation {

  cities: string[];
  files: File[] = [];
  createPlaceForm!: FormGroup;
  place: PlaceDTO | undefined;
  services: string[] = [];

  constructor(private formBuilder: FormBuilder, private placesService: PlacesService, private mapService: MapService, private placeServicesService: PlaceServicesService, private imageService: ImageService) {
    this.getServices();
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

      }),
    });
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.files = Array.from(input.files);
    }
  }

  public uploadImages() {

    this.imageService.upload(this.files[0]).subscribe({
      next: (data) => {

        const currentPhotos = this.createPlaceForm.get('photoUrls')?.value || [];
        this.createPlaceForm.patchValue({
          photoUrls: [...currentPhotos, data.msg.secure_url]
        });

      },
      error: (error) => {
        Swal.fire('Error!', error.error.msg, 'error');
      }
    });
  }

  public createNewPlace() {
    const createPlaceDTO = this.createPlaceForm.value as CreatePlaceDTO;
    const selectedServices = Object.entries(createPlaceDTO.services)
      .filter(([_, value]) => value) // solo los que estén en true
      .map(([key]) => key);

    const payload = {
      ...createPlaceDTO,
      services: selectedServices
    };

    this.placesService.create(payload).subscribe({
      next: (data) => {
        Swal.fire('Creado!', data.msg, 'success');
      },
      error: (error) => {
        Swal.fire('Error!', error.error.msg, 'error');
      }
    })
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

  public getServices() {
    this.placeServicesService.getAll().subscribe({
      next: (data) => {
        this.services = data.msg;
        const servicesGroup: any = {};
        this.services.forEach((service: string) => {
          servicesGroup[service] = [false]; // valor inicial false
        });
        this.createPlaceForm.setControl('services', this.formBuilder.group(servicesGroup));
      },
      error: (error) => {
        Swal.fire('Error!', error.error.msg, 'error');
      }
    })
  }

}
