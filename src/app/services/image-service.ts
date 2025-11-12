import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private imagesURL = "http://localhost:8080/api/image";

  constructor(private http: HttpClient){

  }

  public upload(image: File): Observable<ResponseDTO>{
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<ResponseDTO>(this.imagesURL, formData)
  }

  public delete(id: string): Observable<ResponseDTO>{
    return this.http.delete<ResponseDTO>(`${this.imagesURL}/${id}`)
  }

}
