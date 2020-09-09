import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.models';
import {
  EmployeeCreateDTO,
  EmployeeRemoveDTO,
  EmployeeStatus,
  EmployeeTitle,
  EmployeeUpdateDTO,
} from './employee.interfaces';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

// interface EmployeeCreatedSuccessfullyResponse {
//   message: string;
//   data: Pick<Employee, 'email' | 'name' | 'photo'>;
// }

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Observable<Employee[]>;
  employeeStatusList: Observable<EmployeeStatus[]>;
  employeeTitleList: Observable<EmployeeTitle[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeList = this.employeeService.getList();
    this.employeeStatusList = this.employeeService.getStatusList();
    this.employeeTitleList = this.employeeService.getTitleList();
  }

  create(employeeCreateDto: EmployeeCreateDTO): void {
    const response = this.employeeService.create(employeeCreateDto);
    response.subscribe(
      ({ data }) => {
        console.log('Employee created successfully');
        console.log(data);
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error.message);
        console.error(error.error_message);
      }
    );
  }

  remove(employee: EmployeeRemoveDTO): void {
    this.employeeService.remove(employee).subscribe(
      ({ data, message }) => {
        console.log(message);
        console.log(data);
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  update(employee: EmployeeUpdateDTO): void {
    console.log('update an employee');
  }
}
