import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeCreateDTO } from './employee.models';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeList = this.employeeService.getList();
  }

  createEmployee(employeeCreateDto: EmployeeCreateDTO): void {
    try {
      const response = this.employeeService.create(employeeCreateDto);
      response.subscribe((o) => console.log(o));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
