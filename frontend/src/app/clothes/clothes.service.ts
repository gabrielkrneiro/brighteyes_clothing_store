import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ClothesDetailsDTO, ClothesListDTO } from './clothes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `http://${environment.BACKEND_ADDRESS}/clothes`;
  }

  list(): Observable<ClothesListDTO[]> {
    return this.httpClient.get<ClothesListDTO[]>(this.baseUrl);
  }

  findOne(clothesId: number): Observable<ClothesDetailsDTO> {
    return this.httpClient.get<ClothesDetailsDTO>(
      `${this.baseUrl}/${clothesId}`
    );
  }
}
