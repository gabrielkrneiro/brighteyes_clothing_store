import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  EmployeeCreateDTO,
  EmployeeStatus,
  EmployeeTitle,
} from '../employee.interfaces';
import { Employee } from '../employee.models';

// const employeeMock = {
//   name: 'Employee 007',
//   email: 'employee007@gmail.com',
//   password: 'senha123',
//   birthdate: new Date('12/12/1212'),
//   photo:
//     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
//   registeredBy: 1,
//   status: 2,
//   title: 4,
// } as EmployeeCreateDTO;

const EmployeeCreateDtoDefaultValues = {
  name: '',
  birthdate: null,
  email: '',
  password: '',
  photo: '',
  registeredBy: null,
  status: null,
  title: null,
} as EmployeeCreateDTO;

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isUpdating: boolean;

  @Input() employeeStatusList: Observable<EmployeeStatus[]>;
  @Input() employeeTitleList: Observable<EmployeeTitle[]>;
  @Input() hrEmployeeList: Employee[];

  @Output() createEmployee = new EventEmitter<EmployeeCreateDTO>();
  @Output() updateEmployee = new EventEmitter<EmployeeCreateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      status: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      password: [null, [Validators.required]],
      title: [null, [Validators.required]],
      registeredBy: [null, [Validators.required]],
    });
    this.isUpdating = false;
    // this.employeeForm.patchValue(employeeMock); // fill form with mocked values
  }

  sendEmployee(): void {
    try {
      if (!this.isUpdating) {
        this.createEmployee.next(this.employeeForm.value);
      } else {
        this.updateEmployee.next(this.employeeForm.value);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setEmployeeToUpdate(employee: Employee): void {
    this.isUpdating = true;
    this.employeeForm.patchValue(employee);
    this.employeeForm.patchValue({ title: employee.title.id });
    this.employeeForm.patchValue({ status: employee.status.id });
    this.employeeForm.patchValue({ registeredBy: employee.registeredBy?.id });
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.isUpdating = false;
  }
}
