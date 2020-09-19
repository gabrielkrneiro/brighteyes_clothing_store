import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartModalComponent } from './shopping-cart-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ShoppingCartModalComponent],
  imports: [CommonModule, ModalModule],
  exports: [ShoppingCartModalComponent],
})
export class ShoppingCartModalModule {}
