import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotPageRoutingModule } from './hot-page-routing.module';
import { IndexModule } from './index/index.module';
import { HotPageComponent } from './hot-page.component';

@NgModule({
  declarations: [HotPageComponent],
  imports: [CommonModule, IndexModule, HotPageRoutingModule],
})
export class HotPageModule {}
