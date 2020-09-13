import { Observable, Observer, of } from 'rxjs';
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
import { EmployeeStatusEnum } from './employee.enum';

interface SuccessfullyResponse<T> {
  message: string;
  data: T;
}

interface CreatedSuccessfullyResponse
  extends SuccessfullyResponse<
    Pick<Employee, 'id' | 'name' | 'email' | 'title' | 'status' | 'photo'>
  > {}

interface UpdatedSuccessfullyResponse extends SuccessfullyResponse<Employee> {}

interface RemovedSuccessfullyResponse
  extends Pick<SuccessfullyResponse<null>, 'message'> {}

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

  remove(employee: EmployeeRemoveDTO): Observable<UpdatedSuccessfullyResponse> {
    console.log(`try to remove employee "${employee.name}"`);
    return this.httpClient.put<UpdatedSuccessfullyResponse>(
      `http://${environment.BACKEND_ADDRESS}/employees/` + employee.id,
      {
        status: EmployeeStatusEnum.DEACTIVATED,
      }
    );
  }

  update(employee: Partial<Employee>): Observable<UpdatedSuccessfullyResponse> {
    console.log(`try to remove employee "${employee.name}"`);
    return this.httpClient.put<UpdatedSuccessfullyResponse>(
      `http://${environment.BACKEND_ADDRESS}/employees/` + employee.id,
      employee
    );
  }

  findOne(employee: Employee): Observable<Employee> {
    return this.httpClient.get<Employee>(
      `http://${environment.BACKEND_ADDRESS}/employees/` + employee.id
    );
  }
}
