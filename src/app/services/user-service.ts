import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO } from '../models/response-dto';
import { Observable } from 'rxjs';
import { CreateUserDTO } from '../models/create-user-dto';
import { EditUserDTO } from '../models/edit-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersURL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }


  public edit(editUserDTO: EditUserDTO): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(this.usersURL, editUserDTO);
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.usersURL}/${id}`);
  }

  public get(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.usersURL}/${id}`);
  }

  // Permite obtener los alojamientos de un usuario paginados
  public getPlaces(id: number, page: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.usersURL}/${id}/accommodation`, { params: { page } }); // Si el backend usa @RequestParam para paginación se debe enviar así
  }
}
