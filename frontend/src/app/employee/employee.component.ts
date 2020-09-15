import { Component, OnInit, ViewChild } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeTitleEnum } from './employee.enum';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild(EmployeeFormComponent) employeeForm: EmployeeFormComponent;

  employeeList: Observable<Employee[]>;
  hrEmployeeList: Employee[];
  employeeStatusList: Observable<EmployeeStatus[]>;
  employeeTitleList: Observable<EmployeeTitle[]>;

  selectedEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    this.employeeList = this.employeeService.getList();
    this.selectedEmployee = new Employee();
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
    console.log('Creating a new employee');
    this.employeeService.create(employeeCreateDto).subscribe(
      ({ data }) => {
        console.log('Employee created successfully');
        this.employeeForm.employeeForm.reset();
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

  update(employee: Partial<Employee>): void {
    console.log('Creating a new employee');
    this.employeeService.update(employee).subscribe(
      ({ message }) => {
        console.log(message);
        this.employeeForm.employeeForm.reset();
      },
      ({ error }: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  async findOne(employee: Employee): Promise<void> {
    try {
      const foundEmployee = await this.employeeService
        .getOne(employee.id)
        .toPromise();
      this.employeeForm.setEmployeeToUpdate(foundEmployee);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
