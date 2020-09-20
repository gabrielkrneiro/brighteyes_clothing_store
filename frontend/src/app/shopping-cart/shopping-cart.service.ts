import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from './shopping-cart.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<ShoppingCart[]> {
    try {
      return this.httpClient.get<ShoppingCart[]>(
        `http://${environment.BACKEND_ADDRESS}/shopping-cart`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  addClothesToShoppingCart(
    shoppingCartId: number,
    clothesId: number
  ): Observable<ShoppingCart> {
    try {
      return this.httpClient.put<ShoppingCart>(
        `http://${environment.BACKEND_ADDRESS}/shopping-cart/${shoppingCartId}/add-clothes/${clothesId}`,
        null
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // getStatusList(): Observable<EmployeeStatus[]> {
  //   try {
  //     return this.httpClient.get<EmployeeStatus[]>(
  //       `http://${environment.BACKEND_ADDRESS}/employee-client-status`
  //     );
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // getTitleList(): Observable<EmployeeTitle[]> {
  //   try {
  //     return this.httpClient.get<EmployeeTitle[]>(
  //       `http://${environment.BACKEND_ADDRESS}/employee-title`
  //     );
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // create(employee: EmployeeCreateDTO): Observable<CreatedSuccessfullyResponse> {
  //   return this.httpClient.post<CreatedSuccessfullyResponse>(
  //     `http://${environment.BACKEND_ADDRESS}/shopping-cart`,
  //     employee
  //   );
  // }

  // async remove(
  //   employee: EmployeeRemoveDTO
  // ): Promise<Observable<UpdatedSuccessfullyResponse>> {
  //   console.log(`try to remove employee "${employee.name}"`);
  //   const statusList = await this.getStatusList().toPromise();
  //   const deactivatedStatus = statusList.filter(
  //     (status) => status.name === 'DEACTIVATED'
  //   )[0];
  //   return this.httpClient.put<UpdatedSuccessfullyResponse>(
  //     `http://${environment.BACKEND_ADDRESS}/shopping-cart/` + employee.id,
  //     {
  //       status: deactivatedStatus.id,
  //     }
  //   );
  // }

  // update(employee: Partial<Employee>): Observable<UpdatedSuccessfullyResponse> {
  //   console.log(`try to remove employee "${employee.name}"`);
  //   delete employee.password;
  //   return this.httpClient.put<UpdatedSuccessfullyResponse>(
  //     `http://${environment.BACKEND_ADDRESS}/shopping-cart/` + employee.id,
  //     employee
  //   );
  // }

  // getOne(employeeId: number): Observable<Employee> {
  //   return this.httpClient.get<Employee>(
  //     `http://${environment.BACKEND_ADDRESS}/shopping-cart/` + employeeId
  //   );
  // }
}
