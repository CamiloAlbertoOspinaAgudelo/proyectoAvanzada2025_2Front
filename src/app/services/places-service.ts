import { Injectable } from '@angular/core';
import { PlaceDTO } from '../models/place-dto';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: PlaceDTO[];
  
  constructor(){
    this.places = this.createTestPlaces();
  }

  public getAll() {
    return this.places;
  }

  public save(newPlace: PlaceDTO) {
    newPlace.id = Math.floor(Math.random() * (5000 + 1)); // Genera un ID aleatorio entre 0 y 5000
    this.places.push(newPlace);
  }

  public get(id: number): PlaceDTO | undefined {
    return this.places.find(place => place.id == id); 
  }

  public delete(id: number) {
    this.places = this.places.filter(place => place.id != id);
  }

  public update(id: number, updatedPlace: PlaceDTO) {
    const indice = this.places.findIndex(place => place.id == id);
    if (indice != -1) {
      this.places[indice] = updatedPlace;
    }
  }

  private createTestPlaces(){

  return [
    {
      id: 1,
      title: 'Casa de Campo El Roble',
      description: 'Hermosa casa campestre con vista a las montañas y chimenea.',
      photoUrls: [
        'https://example.com/images/campo1.jpg',
        'https://example.com/images/campo2.jpg'
      ],
      services: ['WiFi', 'Parqueadero', 'Chimenea', 'Zona BBQ'],
      capMax: 6,
      PriceNight: 250000,
      hostId: 'host_001',
      address: {
        city: 'Manizales',
        direction: 'Vereda El Rosario, km 5 vía Neira',
        location: { lat: 5.0703, lng: -75.5138 }
      }
    },
    {
      id: 2,
      title: 'Apartamento Moderno en el Centro',
      description: 'Apartamento completamente amoblado, ideal para estancias cortas.',
      photoUrls: [
        'https://example.com/images/apto1.jpg',
        'https://example.com/images/apto2.jpg'
      ],
      services: ['WiFi', 'Ascensor', 'Aire acondicionado'],
      capMax: 3,
      PriceNight: 180000,
      hostId: 'host_002',
      address: {
        city: 'Bogotá',
        direction: 'Carrera 7 #45-20, Chapinero',
        location: { lat: 4.6486, lng: -74.0635 }
      }
    },
    {
      id: 3,
      title: 'Cabaña en el Lago Azul',
      description: 'Relájate en una cabaña frente al lago con acceso directo al muelle.',
      photoUrls: [
        'https://example.com/images/lago1.jpg',
        'https://example.com/images/lago2.jpg'
      ],
      services: ['WiFi', 'Kayaks', 'Fogata', 'Restaurante'],
      capMax: 4,
      PriceNight: 300000,
      hostId: 'host_003',
      address: {
        city: 'Guatapé',
        direction: 'Orilla del embalse, sector El Peñol',
        location: { lat: 6.2333, lng: -75.1667 }
      }
    }
  ];

}
}