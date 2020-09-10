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
import { EmployeeTitleEnum } from './employee.enum';

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
  hrEmployeeList: Employee[];
  employeeStatusList: Observable<EmployeeStatus[]>;
  employeeTitleList: Observable<EmployeeTitle[]>;

  constructor(private employeeService: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    this.employeeList = this.employeeService.getList();
    this.hrEmployeeList = await this.employeeList
      .toPromise()
      .then((employees) =>
        employees.filter(
          (employee) => employee.title.name === EmployeeTitleEnum.HUMAN_RESOURCE
        )
      );
    this.employeeStatusList = this.employeeService.getStatusList();
    this.employeeTitleList = this.employeeService.getTitleList();
  }

  create(employeeCreateDto: EmployeeCreateDTO): void {
    this.employeeService.create(employeeCreateDto).subscribe(
      ({ data }) => {
        console.log('Employee created successfully');
        this.employeeList
          .subscribe((employees) => employees.push(data as Employee))
          .unsubscribe();
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error.message);
        console.error(error.error_message);
      }
    );
  }

  remove(employee: EmployeeRemoveDTO): void {
    this.employeeService.remove(employee).subscribe(
      ({ message }) => {
        console.log(message);
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
