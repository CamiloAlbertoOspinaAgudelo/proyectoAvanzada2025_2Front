import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapService } from '../../services/map-service';
import { PlaceDTO } from '../../models/place-dto';
import { MarkerDTO } from '../../models/marker-dto';
import { PlacesService } from '../../services/places-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(private mapService: MapService, private placesService: PlacesService) { }

  ngOnInit(): void {
    this.mapService.create();
    // Obtiene todos los alojamientos de prueba
    const places = this.placesService.getAll();
    // Mapea los alojamientos a marcadores y los dibuja en el mapa
    const markers = this.mapItemToMarker(places);
    // Dibuja los marcadores en el mapa
    this.mapService.drawMarkers(markers);
  }

  public mapItemToMarker(places: PlaceDTO[]): MarkerDTO[] {
    return places.map((item) => ({
      id: item.id,
      location: item.address.location,
      title: item.title,
      photoUrl: item.photoUrls[0] || "",
    }));
  }
}
