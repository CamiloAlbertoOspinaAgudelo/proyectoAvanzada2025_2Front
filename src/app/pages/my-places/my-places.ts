import { Component } from '@angular/core';
import { PlaceDTO } from '../../models/place-dto';
import { PlacesService } from '../../services/places-service';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-places',
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './my-places.html',
  styleUrl: './my-places.css'
})
export class MyPlaces {

  places: PlaceDTO[] | undefined;

  constructor(private placesService: PlacesService) {
    this.get();
  }

  public get() {
    // El id que se recibe por la url es de tipo string, pero en el servicio es de tipo number por eso se hace el parseInt
    this.placesService.getAll(0,).subscribe({
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