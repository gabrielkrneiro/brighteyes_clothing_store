import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from './shopping-cart.interface';

import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartList$: Observable<ShoppingCart[]>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadShoppingCartList();
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
}
