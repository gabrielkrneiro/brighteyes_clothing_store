import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartTableComponent } from './shopping-cart-table.component';

@NgModule({
  declarations: [ShoppingCartTableComponent],
  imports: [CommonModule],
  exports: [ShoppingCartTableComponent],
})
export class ShoppingCartTableModule {}
