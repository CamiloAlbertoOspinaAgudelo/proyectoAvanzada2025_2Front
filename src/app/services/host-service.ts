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
export class HostService {
  private hostURL = "http://localhost:8080/api/host";

  constructor(private http: HttpClient) { }

  public getAccommodations(
    id: number,
    page: number,
  ): Observable<ResponseDTO> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<ResponseDTO>(`${this.hostURL}/${id}/accommodations`, { params });
  }
}