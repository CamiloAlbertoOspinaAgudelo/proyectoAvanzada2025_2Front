import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PlacesService } from '../../services/places-service';
import { PlaceDTO } from '../../models/place-dto';

@Component({
  selector: 'app-accommodation',
  imports: [JsonPipe, RouterModule, ReactiveFormsModule],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.css'
})
export class Accommodation {

  placeId: string = "";
  place: PlaceDTO | undefined;

  constructor(private route: ActivatedRoute, private placesServices:PlacesService){
    this.route.params.subscribe( (params) => {
      this.placeId = params["id"];
      this.get(this.placeId);
    });
  }

  public get(placeID: string){
    // El id que se recibe por la url es de tipo string, pero en el servicio es de tipo number por eso se hace el parseInt
    const selectedPlace = this.placesServices.get(parseInt(placeID));
    if(selectedPlace != undefined){
      this.place = selectedPlace;
    }
  }
}
