import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PlacesService } from '../../services/places-service';
import { PlaceDTO } from '../../models/place-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accommodation',
  imports: [RouterModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.css'
})
export class Accommodation {

  placeId: string = "";
  place: PlaceDTO | undefined;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) {
    this.route.params.subscribe((params) => {
      this.placeId = params["id"];
      this.get(this.placeId);
    });
  }

  public get(placeID: string) {
    // El id que se recibe por la url es de tipo string, pero en el servicio es de tipo number por eso se hace el parseInt
    this.placesService.getById(parseInt(placeID)).subscribe({
      next: (data) => {
        this.place = data.msg;
      },
      error: (error) => {
        Swal.fire('Error!', "Error al obtener el alojamiento", 'error');
      }
    })

  }

  getGuestsArray(): number[] {
    return Array.from({ length: this.place?.capMax || 10 }, (_, i) => i + 1);
  }
}
