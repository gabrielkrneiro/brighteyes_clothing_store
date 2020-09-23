import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ShoppingCart,
  ShoppingCartStatusEnum,
} from '../shopping-cart/shopping-cart.interface';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  @Input() shoppingCartList$: Observable<ShoppingCart[]>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartList$ = this.shoppingCartService
      .getList()
      .pipe(
        map((shoppingCarts) =>
          shoppingCarts.filter(
            (sc) => sc.status.name === ShoppingCartStatusEnum.IN_PROGRESS
          )
        )
      );
  }
}
