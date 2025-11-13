import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapService } from '../../services/map-service';
import { PlaceDTO } from '../../models/place-dto';
import { MarkerDTO } from '../../models/marker-dto';
import { PlacesService } from '../../services/places-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  places: PlaceDTO[] = [];

  constructor(private mapService: MapService, private placesService: PlacesService) { }

  ngOnInit(): void {
    this.getPlaces(0);
  }

  public getPlaces(page: number) {
    this.placesService.getAll(page).subscribe({
      next: (data) => {
        this.places = data.msg;
        this.mapService.create(); // Crear el mapa cuando ya se tienen los alojamientos
        this.mapService.drawMarkers(data.msg);  // Recuerde mapear la respuesta a MarkerDTO.
      },
      error: (error) => {
        Swal.fire('Error!', "Error al obtener los alojamientos", 'error');
      }
    });
  }

  public mapItemToMarker(places: PlaceDTO[]): MarkerDTO[] {
    return places.map((item) => ({
      id: item.id,
      location: item.address.location,
      title: item.title,
      photoUrl: item.photoUrls[0] || "",
    }));
  }

  public get() {
      this.placesService.getAll(0).subscribe({
        next: (data) => {
          this.places = data.msg;
        },
        error: (error) => {
          Swal.fire('Error!', "Error al obtener los alojamientos", 'error');
        }
      })
  
    }
}
