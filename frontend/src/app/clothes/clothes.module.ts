import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClothesRoutingModule } from './clothes-routing.module';
import { ClothesComponent } from './clothes.component';

@NgModule({
  declarations: [ClothesComponent],
  imports: [CommonModule, ClothesRoutingModule],
})
export class ClothesModule {}
