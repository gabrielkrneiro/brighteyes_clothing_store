import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/clothes/clothes.interface';
import { ShoppingCart } from '../shopping-cart.interface';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent implements OnInit {
  @Input() shoppingCartList$: Observable<ShoppingCart[]>;

  constructor() {}

  ngOnInit(): void {}

  totalValue(clothes: Clothes[]): number {
    const total = clothes.reduce(c => c.)
  }
}
