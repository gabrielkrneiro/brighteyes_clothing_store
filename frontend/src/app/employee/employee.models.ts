export class Employee {
  id: number;
  name: string;
  photo: string;
  birthdate: Date;
  password: string;
  email: string;
  title: Title;
  status: EmployeeStatus;
  registeredBy?: Employee;
}

export interface EmployeeCreateDTO {
  name: string;
  photo: string;
  birthdate: Date;
  password: string;
  email: string;
  title: number;
  status: number;
  registeredBy: number;
}

export interface Title {
  id: number;
  name: string;
}

export interface EmployeeStatus {
  id: number;
  name: string;
}
