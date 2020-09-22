import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../client/client.interfaces';
import { ClientService } from '../client/client.service';
import { EmployeeTitleEnum } from '../employee/employee.enum';
import { Employee } from '../employee/employee.models';
import { EmployeeService } from '../employee/employee.service';
import { ShoppingCartFormComponent } from './shopping-cart-form/shopping-cart-form.component';
import {
  ShoppingCart,
  ShoppingCartCreateDTO,
  ShoppingCartStatus,
  ShoppingCartStatusEnum,
} from './shopping-cart.interface';

import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartList$: Observable<ShoppingCart[]>;
  shoppingCartStatusList$: Observable<ShoppingCartStatus[]>;
  clientList$: Observable<Client[]>;
  sellerEmployeeList: Promise<Employee[]>;

  @ViewChild(ShoppingCartFormComponent)
  shoppingCartForm: ShoppingCartFormComponent;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private employeeService: EmployeeService,
    private clientService: ClientService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadShoppingCartList();
    this.shoppingCartStatusList$ = this.shoppingCartService.getStatusList();
    this.sellerEmployeeList = this.employeeService.getList().toPromise();
    this.clientList$ = this.clientService.list();
  }

  remove(event): void {
    console.log(event);
  }

  findOne(event): void {
    console.log(event);
  }

  loadShoppingCartList(): void {
    this.shoppingCartList$ = this.shoppingCartService.getList();
  }

  registerShoppingCart(shoppingCart: ShoppingCartCreateDTO): void {
    this.shoppingCartService.create(shoppingCart).subscribe(
      ({ message }) => {
        console.log(message);
        this.loadShoppingCartList();
        this.shoppingCartForm.resetForm();
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
}
