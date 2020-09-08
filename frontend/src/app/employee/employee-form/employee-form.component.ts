import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeCreateDTO } from '../employee.models';

const employeeMock = {
  name: 'Employee 007',
  email: 'employee007@gmail.com',
  password: 'senha123',
  birthdate: new Date('12/12/1212'),
  photo:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  registeredBy: 1,
  status: 2,
  title: 4,
} as EmployeeCreateDTO;

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employee: EmployeeCreateDTO;
  employeeForm: FormGroup;

  @Output() createEmployee = new EventEmitter<EmployeeCreateDTO>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employee = {} as EmployeeCreateDTO;
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      status: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required]],
      title: ['', [Validators.required]],
      registeredBy: ['', [Validators.required]],
    });
  }

  sendEmployee(): void {
    const o = this.employeeForm.value;
    Object.assign(o, employeeMock);
    this.createEmployee.next(o);
  }
}
