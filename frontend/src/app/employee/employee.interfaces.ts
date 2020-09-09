import { Employee } from './employee.models';

class EmployeeCreateDTO {
  name: string;
  photo: string;
  birthdate: Date;
  password: string;
  email: string;
  title: number;
  status: number;
  registeredBy: number;
}

interface EmployeeRemoveDTO
  extends Pick<
    Employee,
    'id' | 'name' | 'email' | 'title' | 'status' | 'photo'
  > {}

interface EmployeeUpdateDTO
  extends Pick<
    Employee,
    'id' | 'name' | 'email' | 'title' | 'status' | 'photo'
  > {}

interface EmployeeTitle {
  id: number;
  name: string;
}

interface EmployeeStatus {
  id: number;
  name: string;
}

export {
  EmployeeCreateDTO,
  EmployeeTitle,
  EmployeeStatus,
  EmployeeRemoveDTO,
  EmployeeUpdateDTO,
};
