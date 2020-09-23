import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/clothes/clothes.interface';
import { ShoppingCart } from '../shopping-cart.interface';
import { ShoppingCartService } from '../shopping-cart.service';
import { calcTotalCost } from './../../common/calcTotalCost';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent implements OnInit {
  @Input() shoppingCartList$: Observable<ShoppingCart[]>;

  @Output() loadShoppingCartList = new EventEmitter<void>();

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  totalValue(clothes: Clothes[]): number {
    return calcTotalCost(clothes);
  }

  addClothes({
    requestedClothesId,
    shoppingCartId,
  }: {
    requestedClothesId: number;
    shoppingCartId: number;
  }): void {
    console.log(requestedClothesId, shoppingCartId);
    this.shoppingCartService
      .addClothesToShoppingCart(shoppingCartId, requestedClothesId)
      .subscribe(
        (response) => {
          console.log(response);
          this.loadShoppingCartList.next();
        },
        ({ error }: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
  }

  removeClothes({
    requestedClothesId,
    shoppingCartId,
  }: {
    requestedClothesId: number;
    shoppingCartId: number;
  }): void {
    this.shoppingCartService
      .removeClothesToShoppingCart(shoppingCartId, requestedClothesId)
      .subscribe(
        (response) => {
          console.log(response);
          this.loadShoppingCartList.next();
        },
        ({ error }: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
  }
}
