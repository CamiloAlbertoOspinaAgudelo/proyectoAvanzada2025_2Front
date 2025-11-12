import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class PlaceServicesService {

  private serviceURL = "http://localhost:8080/api/service";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(this.serviceURL)
  }
}
