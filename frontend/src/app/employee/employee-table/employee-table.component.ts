import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRemoveDTO, EmployeeUpdateDTO } from '../employee.interfaces';

import { Employee } from '../employee.models';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  @Input() employeeList: Observable<Employee[]>;

  @Output() removeEmployee = new EventEmitter<EmployeeRemoveDTO>();
  @Output() updateEmployee = new EventEmitter<EmployeeUpdateDTO>();

  removeButtonClicked(employee: EmployeeRemoveDTO) {
    this.removeEmployee.next(employee);
  }

  updateButtonClicked(employee: EmployeeUpdateDTO) {
    this.updateEmployee.next(employee);
  }
}
