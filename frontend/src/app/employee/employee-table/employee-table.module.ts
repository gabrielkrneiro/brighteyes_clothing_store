import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table.component';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [CommonModule],
  exports: [EmployeeTableComponent],
})
export class EmployeeTableModule {}
