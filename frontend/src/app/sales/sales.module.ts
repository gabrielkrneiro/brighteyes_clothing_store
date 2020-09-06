import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SalesFormModule } from './sales-form/sales-form.module';
import { SalesTableModule } from './sales-table/sales-table.module';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SalesFormModule,
    SalesTableModule,
  ],
})
export class SalesModule {}
