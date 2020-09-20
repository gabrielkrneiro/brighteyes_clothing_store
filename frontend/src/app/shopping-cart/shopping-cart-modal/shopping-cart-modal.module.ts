import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartModalComponent } from './shopping-cart-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingCartModalComponent],
  imports: [CommonModule, ModalModule, FormsModule, ReactiveFormsModule],
  exports: [ShoppingCartModalComponent],
})
export class ShoppingCartModalModule {}
