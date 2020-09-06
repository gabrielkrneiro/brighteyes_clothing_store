import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartFormComponent } from './shopping-cart-form.component';

@NgModule({
  declarations: [ShoppingCartFormComponent],
  imports: [CommonModule],
  exports: [ShoppingCartFormComponent],
})
export class ShoppingCartFormModule {}
