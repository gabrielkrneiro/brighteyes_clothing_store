import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from './employee.models';
import { environment } from './../../environments/environment';
import {
  EmployeeStatus,
  EmployeeCreateDTO,
  EmployeeTitle,
  EmployeeRemoveDTO,
} from './employee.interfaces';

interface SuccessfullyResponse<T> {
  message: string;
  data: T;
}

interface CreatedSuccessfullyResponse
  extends SuccessfullyResponse<Pick<Employee, 'email' | 'name' | 'photo'>> {}

interface RemovedSuccessfullyResponse extends SuccessfullyResponse<string> {}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Employee[]> {
    try {
      return this.httpClient.get<Employee[]>(
        `http://${environment.BACKEND_ADDRESS}/employees`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getStatusList(): Observable<EmployeeStatus[]> {
    try {
      return this.httpClient.get<EmployeeStatus[]>(
        `http://${environment.BACKEND_ADDRESS}/employee-client-status`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getTitleList(): Observable<EmployeeTitle[]> {
    try {
      return this.httpClient.get<EmployeeTitle[]>(
        `http://${environment.BACKEND_ADDRESS}/employee-title`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  create(employee: EmployeeCreateDTO): Observable<CreatedSuccessfullyResponse> {
    return this.httpClient.post<CreatedSuccessfullyResponse>(
      `http://${environment.BACKEND_ADDRESS}/employees`,
      employee
    );
  }

  remove(employee: EmployeeRemoveDTO): Observable<RemovedSuccessfullyResponse> {
    console.log(`try to remove employee "${employee.name}"`);
    console.log(employee);

    return this.httpClient.delete<RemovedSuccessfullyResponse>(
      `http://${environment.BACKEND_ADDRESS}/employees/${employee.id}`
    );
  }
}
