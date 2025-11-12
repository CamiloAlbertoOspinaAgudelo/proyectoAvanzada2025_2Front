import { Component } from '@angular/core';
import { PlaceDTO } from '../../models/place-dto';
import { PlacesService } from '../../services/places-service';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HostService } from '../../services/host-service';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-my-places',
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './my-places.html',
  styleUrl: './my-places.css'
})
export class MyPlaces {

  places: PlaceDTO[] = [];

  constructor(private placesService: PlacesService, private hostService: HostService, private tokenService: TokenService) {
    this.get();
  }

  public get() {
    const id = this.tokenService.getUserId();
    this.hostService.getAccommodations(id, 0).subscribe({
      next: (data) => {
        this.places = data.msg;
      },
      error: (error) => {
        Swal.fire('Error!', "Error al obtener los alojamientos", 'error');
      }
    })

  }

  public onDelete(placeId: number) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cambiará el estado de los alojamientos a Eliminados.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.placesService.delete(placeId).subscribe({
          next: (data) => {
            if (this.places) {
              this.places = this.places.filter(p => p.id !== placeId);
              Swal.fire('Eliminado!', 'El alojamiento ha sido eliminado.', 'success');
            }
          },
          error: (error) => {
            Swal.fire('Error!', "Error al eliminar el alojamiento", 'error');
          }
        });
      }
    });
  }

}