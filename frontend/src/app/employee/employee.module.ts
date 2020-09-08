import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeTableModule } from './employee-table/employee-table.module';
import { EmployeeFormModule } from './employee-form/employee-form.module';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EmployeeTableModule,
    EmployeeFormModule,
    HttpClientModule,
  ],
  providers: [EmployeeService],
})
export class EmployeeModule {}
