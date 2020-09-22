import { Clothes } from '../clothes/clothes.interface';
import { Client } from './../client/client.interfaces';
import { Employee } from './../employee/employee.models';

interface ShoppingCart {
  id: number;
  client: Client;
  seller: Employee;
  status: ShoppingCartStatus;
  createdAt: Date;
  updatedAt: Date;
  cashier?: Employee;
  clothes?: Clothes[];
}

interface ShoppingCartStatus {
  id: number;
  name: ShoppingCartStatusEnum;
}

enum ShoppingCartStatusEnum {
  IN_PROGRESS = 'IN PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

interface CreateShoppingCartSuccessfullResponse {
  message: string;
  data: ShoppingCart;
}

interface ShoppingCartCreateDTO
  extends Omit<ShoppingCart, 'id' | 'createdAt' | 'updatedAt'> {}

export {
  ShoppingCart,
  ShoppingCartStatus,
  ShoppingCartCreateDTO,
  ShoppingCartStatusEnum,
  CreateShoppingCartSuccessfullResponse,
};
