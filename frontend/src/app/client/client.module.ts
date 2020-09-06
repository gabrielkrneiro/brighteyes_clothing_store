import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientTableModule } from './client-table/client-table.module';
import { ClientFormModule } from './client-form/client-form.module';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ClientTableModule,
    ClientFormModule,
  ],
})
export class ClientModule {}
