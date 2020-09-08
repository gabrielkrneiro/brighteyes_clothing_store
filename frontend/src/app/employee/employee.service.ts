import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee, EmployeeCreateDTO } from './employee.models';
import { environment } from './../../environments/environment';

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

  create(employee: EmployeeCreateDTO): Observable<Employee> {
    try {
      return this.httpClient.post<Employee>(
        `http://${environment.BACKEND_ADDRESS}/employees`,
        employee
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
