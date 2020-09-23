import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/clothes/clothes.interface';
import { ShoppingCart } from 'src/app/shopping-cart/shopping-cart.interface';
import { calcTotalCost } from './../../common/calcTotalCost';

@Component({
  selector: 'app-cashier-table',
  templateUrl: './cashier-table.component.html',
  styleUrls: ['./cashier-table.component.scss'],
})
export class CashierTableComponent implements OnInit {
  @Input() shoppingCartList$: Observable<ShoppingCart[]>;

  @Output() loadShoppingCartList = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  totalValue(clothes: Clothes[]): number {
    return calcTotalCost(clothes);
  }
}
