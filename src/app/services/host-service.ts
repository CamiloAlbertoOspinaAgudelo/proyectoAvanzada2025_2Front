import { Injectable } from '@angular/core';
import { PlaceDTO } from '../models/place-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';
import { CreatePlaceDTO } from '../models/create-place-dto';
import { EditPlaceDTO } from '../models/edit-place-dto';
import { CreateUserDTO } from '../models/create-user-dto';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private hostURL = "http://localhost:8080/api/host";

  constructor(private http: HttpClient) { }

  public create(createUserDTO: CreateUserDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.hostURL, createUserDTO);
  }

  public getAccommodations(
    id: number,
    page: number,
  ): Observable<ResponseDTO> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<ResponseDTO>(`${this.hostURL}/${id}/accommodations`, { params });
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.hostURL}/${id}`);
  }

  public getReserves(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.hostURL}/${id}/accomodations/reserves`);
  }
}