import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  Client,
  ClientCreateDTO,
  ClientStatus,
  ClientUpdateDTO,
} from './client.interfaces';

interface CreatedClientSuccessfullyResponse extends Client {}
interface UpdatedClientSuccessfullyResponse extends Client {}
interface RemovedClientSuccessfullyResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `http://${environment.BACKEND_ADDRESS}/clients`;
  }

  list(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.baseUrl);
  }

  findOne(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseUrl}/${id}`);
  }

  statusList(): Observable<ClientStatus[]> {
    return this.httpClient.get<ClientStatus[]>(
      `http://${environment.BACKEND_ADDRESS}/employee-client-status`
    );
  }

  create(
    formValues: ClientCreateDTO
  ): Observable<CreatedClientSuccessfullyResponse> {
    return this.httpClient.post<CreatedClientSuccessfullyResponse>(
      this.baseUrl,
      formValues
    );
  }

  remove(id: number): Observable<RemovedClientSuccessfullyResponse> {
    return this.httpClient.delete<RemovedClientSuccessfullyResponse>(
      `${this.baseUrl}/${id}`
    );
  }

  update(
    formValues: ClientUpdateDTO
  ): Observable<UpdatedClientSuccessfullyResponse> {
    return this.httpClient.put<UpdatedClientSuccessfullyResponse>(
      `${this.baseUrl}/${formValues.id}`,
      formValues
    );
  }
}
