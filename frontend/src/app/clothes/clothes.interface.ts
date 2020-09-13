import { Employee } from '../employee/employee.models';

interface Clothes {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantityInStock: number;
  status: ClothesStatus;
  wareHouseEmployees: Employee[];
}

interface ClothesStatus {
  id: number;
  name: string;
}

interface ClothesListDTO extends Omit<Clothes, 'wareHouseEmployees'> {}
interface ClothesDetailsDTO extends Clothes {}

export { Clothes, ClothesStatus, ClothesListDTO, ClothesDetailsDTO };
