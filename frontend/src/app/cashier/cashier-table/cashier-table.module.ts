import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierTableComponent } from './cashier-table.component';

@NgModule({
  declarations: [CashierTableComponent],
  imports: [CommonModule],
  exports: [CashierTableComponent],
})
export class CashierTableModule {}
