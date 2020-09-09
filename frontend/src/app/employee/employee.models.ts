import { EmployeeStatus, EmployeeTitle } from './employee.interfaces';

class Employee {
  id: number;
  name: string;
  photo: string;
  birthdate: Date;
  password: string;
  email: string;
  title: EmployeeTitle;
  status: EmployeeStatus;
  registeredBy?: Employee;
}

export { Employee };
