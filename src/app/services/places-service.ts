import { Injectable } from '@angular/core';
import { PlaceDTO } from '../models/place-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';
import { CreatePlaceDTO } from '../models/create-place-dto';
import { EditPlaceDTO } from '../models/edit-place-dto';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesURL = "http://localhost:8080/api/accommodations";

  constructor(private http: HttpClient) { }

  public create(createPlaceDTO: CreatePlaceDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.placesURL, createPlaceDTO);
  }

  public edit(id: number, editPlaceDTO: EditPlaceDTO): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(`${this.placesURL}/${id}`, editPlaceDTO);
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.placesURL}/${id}`);
  }

  public getById(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.placesURL}/${id}`);
  }

  public getAll(
    page: number,
    filters?: {
      city?: string;
      // Agregar más filtros si es necesario
    }
  ): Observable<ResponseDTO> {

    // Se utiliza HttpParams para enviar los parámetros como @RequestParam. Dado que page es obligatorio, se inicializa con ese valor.
    let params = new HttpParams().set('page', page.toString());

    // Si se envían filtros, se agregan a los parámetros
    if (filters) {
      if (filters.city) params = params.set('city', filters.city);
      // Agregar más filtros si es necesario
    }

    return this.http.get<ResponseDTO>(this.placesURL, { params });
  }
}