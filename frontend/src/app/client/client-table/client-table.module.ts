import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table.component';

@NgModule({
  declarations: [ClientTableComponent],
  imports: [CommonModule],
  exports: [ClientTableComponent],
})
export class ClientTableModule {}
