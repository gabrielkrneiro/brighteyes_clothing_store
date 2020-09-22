import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/client/client.interfaces';
import { EmployeeTitleEnum } from 'src/app/employee/employee.enum';
import { Employee } from 'src/app/employee/employee.models';
import {
  ShoppingCartCreateDTO,
  ShoppingCartStatus,
} from '../shopping-cart.interface';

@Component({
  selector: 'app-shopping-cart-form',
  templateUrl: './shopping-cart-form.component.html',
  styleUrls: ['./shopping-cart-form.component.scss'],
})
export class ShoppingCartFormComponent implements OnInit {
  formGroup: FormGroup;
  isUpdating: boolean;

  @Output() registerShoppingCart = new EventEmitter<ShoppingCartCreateDTO>();

  @Input() sellerEmployeeList: Promise<Employee[]>;
  @Input() shoppingCartStatusList: Observable<ShoppingCartStatus[]>;
  @Input() clientList: Observable<Client[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.formGroup = this.fb.group({
      id: [null],
      clothes: [[]],
      client: [null, [Validators.required]],
      seller: [null, [Validators.required]],
      status: [2, [Validators.required]],
    });
    this.sellerEmployeeList = this.sellerEmployeeList.then((employees) =>
      employees.filter((employee) => {
        if (employee.title.name === EmployeeTitleEnum.SELLER) return employee;
      })
    );
  }

  resetForm(): void {
    this.formGroup.reset();
  }

  sendShoppingCartForm(): void {
    this.registerShoppingCart.next(this.formGroup.value);
  }
}
