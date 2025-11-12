import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBookingDto } from '../models/create-booking-dto';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingURL = "http://localhost:8080/api/reservations";

  constructor(private http: HttpClient) { }

  public create(createBookingDto: CreateBookingDto): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.bookingURL, createBookingDto);
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

    return this.http.get<ResponseDTO>(this.bookingURL, { params });
  }

  public getById(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.bookingURL}/${id}`);
  }

  public cancel(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.bookingURL}/${id}/status`);
  }
}
