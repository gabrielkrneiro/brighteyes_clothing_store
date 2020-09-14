import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothesFormComponent } from './clothes-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClothesFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ClothesFormComponent],
})
export class ClothesFormModule {}
