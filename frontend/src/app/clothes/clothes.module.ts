import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClothesRoutingModule } from './clothes-routing.module';
import { ClothesComponent } from './clothes.component';
import { ClothesFormModule } from './clothes-form/clothes-form.module';
import { ClothesTableModule } from './clothes-table/clothes-table.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClothesComponent],
  imports: [
    CommonModule,
    ClothesRoutingModule,
    ClothesFormModule,
    ClothesTableModule,
    SharedModule,
  ],
})
export class ClothesModule {}
